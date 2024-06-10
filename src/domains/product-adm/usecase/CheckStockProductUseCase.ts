import ProductGateway from '../gateway/product.gateway';

export type CheckStockProductUseCaseInputDTO = {
  productId: string;
};

type CheckStockProductUseCaseOutputDTO = {
  productId: string;
  stock: number;
}

export default class CheckStockProductUseCase {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: CheckStockProductUseCaseInputDTO): Promise<CheckStockProductUseCaseOutputDTO> {
    const product = await this._productRepository.find(input.productId)
    return {
      productId: product.id.value,
      stock: product.stock
    }
  }
}