import ProductGateway from '../domain/gateway/ProductGateway';
import Product from '../domain/entity/Product';
import ProductModel from './ProductModel';
import Id from '../../@shared/domain/value-object/id.value-object';

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map(product => new Product(new Id(product.id), product.name, product.description, product.salesPrice));
  }

  async findById(id: string): Promise<Product> {
    return null;
  }
}