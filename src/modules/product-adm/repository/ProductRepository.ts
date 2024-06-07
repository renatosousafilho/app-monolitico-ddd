import ProductGateway from '../gateway/product.gateway';
import Product from '../entity/product.entity';
import ProductModel from './ProductModel';
import Id from '../../@shared/domain/value-object/id.value-object';

export default class ProductRepository implements ProductGateway {
  async find(id: string): Promise<Product> {
    const productFound = await ProductModel.findByPk(id);
    if (!productFound) {
      throw new Error('Product not found');
    }

    return new Product({
      id: new Id(productFound.id),
      name: productFound.name,
      description: productFound.description,
      purchasePrice: productFound.purchasePrice,
      stock: productFound.stock,
      createdAt: productFound.createdAt,
      updatedAt: productFound.updatedAt,
    });
  }

  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.value,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }
}