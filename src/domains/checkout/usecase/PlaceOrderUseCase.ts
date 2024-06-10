import Id from '../../@shared/value-object/id.value-object';
import ClientAdminFacadeInterface from '../../client-adm/facade/ClientAdminFacadeInterface';
import InvoiceFacadeInterface from '../../invoice/facade/InvoiceFacadeInterface';
import PaymentFacadeInterface from '../../payment/facade/PaymentFacadeInterface';
import ProductAdminFacadeInterface from '../../product-adm/facade/ProductAdminFacadeInterface';
import StoreCatalogFacadeInterface from '../../store-catalog/facade/StoreCatalogFacadeInterface';
import Client from '../entity/Client';
import Order from '../entity/Order';
import Product from '../entity/Product';
import OrderGateway from '../gateway/OrderGateway';

export type PlaceOrderUseCaseInput = {
  clientId: string;
  products: {
    productId: string;
  }[];
}

type PlaceOrderUseCaseOutput = {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[];
}

type PlaceOrderUseCaseProps = {
  orderRepository?: OrderGateway;
  clientAdminFacade?: ClientAdminFacadeInterface;
  productAdminFacade?: ProductAdminFacadeInterface;
  storeCatalogFacade?: StoreCatalogFacadeInterface;
  paymentFacade?: PaymentFacadeInterface;
  invoiceFacade?: InvoiceFacadeInterface;
}

export default class PlaceOrderUseCase {
  private _orderRepository: OrderGateway;
  private _clientAdminFacade: ClientAdminFacadeInterface;
  private _productAdminFacade: ProductAdminFacadeInterface;
  private _storeCatalogFacade: StoreCatalogFacadeInterface;
  private _paymentFacade: PaymentFacadeInterface;
  private _invoiceFacade: InvoiceFacadeInterface;

  constructor(props: PlaceOrderUseCaseProps) {
    this._orderRepository = props.orderRepository,
    this._clientAdminFacade = props.clientAdminFacade;
    this._productAdminFacade = props.productAdminFacade;
    this._storeCatalogFacade = props.storeCatalogFacade;
    this._paymentFacade = props.paymentFacade;
    this._invoiceFacade = props.invoiceFacade;
  }

  private async checkStockProducts(products: { productId: string }[]) {
    if (products.length === 0) {
      throw new Error('Products are required');
    }

    for (const product of products) {
      const productFound = await this._productAdminFacade.checkStockProduct({ productId: product.productId });
      if (!productFound) {
        throw new Error('Product not found');
      }

      if (productFound.stock === 0) {
        throw new Error('Product out of stock');
      }
    }
  }

  private async buildClient(clientId: string): Promise<Client> {
    const client = await this._clientAdminFacade.find({ id: clientId });
    if (!client) {
      throw new Error('Client not found');
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address
    });
  }

  private async buildProducts(products: { productId: string }[]): Promise<Product[]> {
    const productsPromises = products.map(async product => {
      const productFound = await this._storeCatalogFacade.find({ id: product.productId });
      if (!productFound) {
        throw new Error('Product not found in store catalog');
      }

      return new Product({
        id: new Id(productFound.id),
        name: productFound.name,
        description: productFound.description,
        salesPrice: productFound.salesPrice
      });
    });

    return Promise.all(productsPromises);
  }

  async generateInvoice(order: Order) {
    const items = order.products.map((product) => ({
      id: product.id.value,
      name: product.name,
      price: product.salesPrice,
    }))
    const invoice = await this._invoiceFacade.generate({
      name: order.client.name,
      // Refatorar para pegar dados de cliente!!!
      document: '',
      street: '',
      number: '',
      complement: '',
      city: '',
      state: '',
      zipCode: '',
      items,
    })
    return invoice;
  }

  async execute(input: PlaceOrderUseCaseInput): Promise<PlaceOrderUseCaseOutput> {
    const client = await this.buildClient(input.clientId);
    await this.checkStockProducts(input.products);
    const products = await this.buildProducts(input.products);

    const order = new Order({
      client,
      products,
    });

    const payment = await this._paymentFacade.process({
      orderId: order.id.value,
      amount: order.total,
    })

    let invoiceId = null;
    if (payment.status === 'approved') {
      order.approve();
      const invoice = await this.generateInvoice(order);
      invoiceId = invoice.id;
    } else {
      order.decline();
    }

    await this._orderRepository.add(order);
  
    return {
      id: order.id.value,
      invoiceId,
      status: order.status,
      total: order.total,
      products: order.products.map((p) => ({ productId: p.id.value })),
    };
  }
}