import ProductGateway from '../gateway/product.gateway';

type CheckStockProductUseCaseInput = {
  productId: string;
};

type CheckStockProductUseCaseOutput = {
  productId: string;
  stock: number;
}

export default class CheckStockProductUseCase {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: CheckStockProductUseCaseInput): Promise<CheckStockProductUseCaseOutput> {
    const product = await this._productRepository.find(input.productId)
    return {
      productId: product.id.value,
      stock: product.stock
    }
  }
}