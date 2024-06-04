import ProductAdminFacadeInterface from './ProductAdminFacadeInterface';
import ProductRepository from '../repository/ProductRepository';
import AddProductUseCase from '../usecase/AddProductUseCase';
import ProductAdminFacade from './ProductAdminFacade';
import CheckStockProductUseCase from '../usecase/CheckStockProductUseCase';

export default class ProductAdminFacadeFactory {
  static create(): ProductAdminFacadeInterface {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockProductUseCase = new CheckStockProductUseCase(productRepository);
    return new ProductAdminFacade(addProductUseCase, checkStockProductUseCase);
  }
}