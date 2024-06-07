import Id from '../../@shared/domain/value-object/id.value-object';
import ClientAdminFacadeInterface from '../../client-adm/facade/ClientAdminFacadeInterface';
import ProductAdminFacadeInterface from '../../product-adm/facade/ProductAdminFacadeInterface';
import StoreCatalogFacadeInterface from '../../store-catalog/facade/StoreCatalogFacadeInterface';
import Client from '../domain/Client';
import Order from '../domain/Order';
import Product from '../domain/Product';

type PlaceOrderUseCaseInput = {
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
  clientAdminFacade?: ClientAdminFacadeInterface;
  productAdminFacade?: ProductAdminFacadeInterface;
  storeCatalogFacade?: StoreCatalogFacadeInterface;
}

export default class PlaceOrderUseCase {
  private _clientAdminFacade: ClientAdminFacadeInterface;
  private _productAdminFacade: ProductAdminFacadeInterface;
  private _storeCatalogFacade: StoreCatalogFacadeInterface;

  constructor(props: PlaceOrderUseCaseProps) {
    this._clientAdminFacade = props.clientAdminFacade;
    this._productAdminFacade = props.productAdminFacade;
    this._storeCatalogFacade = props.storeCatalogFacade;
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

  async execute(input: PlaceOrderUseCaseInput): Promise<PlaceOrderUseCaseOutput> {
    const client = await this.buildClient(input.clientId);
    await this.checkStockProducts(input.products);
    const products = await this.buildProducts(input.products);

    const order = new Order({
      client,
      products,
    });
  
    return {
      id: 'order-id',
      invoiceId: 'invoice-id',
      status: 'pending',
      total: 0,
      products: []
    }
  }
}