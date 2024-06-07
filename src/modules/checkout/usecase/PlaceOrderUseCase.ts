import ClientAdminFacadeInterface from '../../client-adm/facade/ClientAdminFacadeInterface';
import ProductAdminFacadeInterface from '../../product-adm/facade/ProductAdminFacadeInterface';
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
}

export default class PlaceOrderUseCase {
  private _clientAdminFacade: ClientAdminFacadeInterface;
  private _productAdminFacade: ProductAdminFacadeInterface;

  constructor(props: PlaceOrderUseCaseProps) {
    this._clientAdminFacade = props.clientAdminFacade;
    this._productAdminFacade = props.productAdminFacade;
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

  async execute(input: PlaceOrderUseCaseInput): Promise<PlaceOrderUseCaseOutput> {
    const client = await this._clientAdminFacade.find({ id: input.clientId });
    if (!client) {
      throw new Error('Client not found');
    }

    await this.checkStockProducts(input.products);
  
    return {
      id: 'order-id',
      invoiceId: 'invoice-id',
      status: 'pending',
      total: 0,
      products: []
    }
  }
}