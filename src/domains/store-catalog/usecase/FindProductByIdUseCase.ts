import ProductGateway from '../gateway/ProductGateway';

type FindProductByIdUseCaseInput = {
  productId: string;
};

type FindProductByIdUseCaseOutput = {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
};

export default class FindProductByIdUseCase {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: FindProductByIdUseCaseInput): Promise<FindProductByIdUseCaseOutput> {
    const product = await this._productRepository.findById(input.productId);

    return {
      id: product.id.value,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
  }
}