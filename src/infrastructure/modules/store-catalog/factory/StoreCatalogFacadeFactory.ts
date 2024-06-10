import StoreCatalogFacade from '../../../../domains/store-catalog/facade/StoreCatalogFacade';
import StoreCatalogFacadeInterface from '../../../../domains/store-catalog/facade/StoreCatalogFacadeInterface';
import FindAllProductsUseCase from '../../../../domains/store-catalog/usecase/FindAllProductsUseCase';
import FindProductByIdUseCase from '../../../../domains/store-catalog/usecase/FindProductByIdUseCase';
import ProductRepository from '../repository/ProductRepository';

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacadeInterface {
    const productRepository = new ProductRepository();
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
    const findProductByIdUseCase = new FindProductByIdUseCase(productRepository);
    return new StoreCatalogFacade(findAllProductsUseCase, findProductByIdUseCase);
  }
}