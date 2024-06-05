import Product from '../entity/Product';
import ProductGateway from '../gateway/ProductGateway';

type FindAllProductsUseCaseOutput = {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
};

export default class FindAllProductsUseCase {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(): Promise<FindAllProductsUseCaseOutput> {
    const products = await this._productRepository.findAll();

    return {
      products: products.map(product => ({
        id: product.id.value,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      }))
    }
  }
}