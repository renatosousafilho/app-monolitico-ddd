import Product from '../entity/Product';

export default interface ProductGateway {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
}