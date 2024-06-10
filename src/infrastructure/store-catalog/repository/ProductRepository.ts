import ProductGateway from '../../../domains/store-catalog/gateway/ProductGateway';
import Product from '../../../domains/store-catalog/entity/Product';
import ProductModel from './ProductModel';
import Id from '../../../domains/@shared/value-object/id.value-object';

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map(product => new Product(new Id(product.id), product.name, product.description, product.salesPrice));
  }

  async findById(id: string): Promise<Product> {
    const product = await ProductModel.findByPk(id);

    return new Product(new Id(product.id), product.name, product.description, product.salesPrice);
  }
}