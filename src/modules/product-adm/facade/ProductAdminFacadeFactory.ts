import ProductAdminFacadeInterface from './ProductAdminFacadeInterface';
import ProductRepository from '../repository/ProductRepository';
import AddProductUseCase from '../usecase/AddProductUseCase';
import ProductAdminFacade from './ProductAdminFacade';

export default class ProductAdminFacadeFactory {
  static create(): ProductAdminFacadeInterface {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    return new ProductAdminFacade(addProductUseCase);
  }
}