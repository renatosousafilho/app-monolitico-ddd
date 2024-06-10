import ProductAdminFacadeInterface from '../../../domains/product-adm/facade/ProductAdminFacadeInterface';
import ProductRepository from '../repository/ProductRepository';
import AddProductUseCase from '../../../domains/product-adm/usecase/AddProductUseCase';
import ProductAdminFacade from '../../../domains/product-adm/facade/ProductAdminFacade';
import CheckStockProductUseCase from '../../../domains/product-adm/usecase/CheckStockProductUseCase';

export default class ProductAdminFacadeFactory {
  static create(): ProductAdminFacadeInterface {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockProductUseCase = new CheckStockProductUseCase(productRepository);
    return new ProductAdminFacade(addProductUseCase, checkStockProductUseCase);
  }
}