import ProductGateway from '../gateway/product.gateway';
import Product from '../domain/product.entity';
import Id from '../../@shared/domain/value-object/id.value-object';

type AddProductInput = {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
};

type AddProductOutput = {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt: Date; 
  updatedAt: Date;
};

export default class AddProductUseCase {
  private _productGateway: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this._productGateway = productGateway;
  }

  async execute(input: AddProductInput): Promise<AddProductOutput> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };
    const product = new Product(props);
    await this._productGateway.add(product);
    return {
      id: product.id.value,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}