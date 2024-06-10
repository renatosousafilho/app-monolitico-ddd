import ProductGateway from '../gateway/ProductGateway';
import FindAllProductsUseCase from '../usecase/FindAllProductsUseCase';
import FindProductByIdUseCase from '../usecase/FindProductByIdUseCase';
import StoreCatalogFacadeInterface, { FindAllStoreCatalogProductsOutput, FindStoreCatalogProductInput, FindStoreCatalogProductOutput } from './StoreCatalogFacadeInterface';

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findAllProductsUseCase: FindAllProductsUseCase;
  private _findProductByIdUseCase: FindProductByIdUseCase;

  constructor(findAllProductsUseCase: FindAllProductsUseCase, findProductByIdUseCase: FindProductByIdUseCase) {
    this._findAllProductsUseCase = findAllProductsUseCase;
    this._findProductByIdUseCase = findProductByIdUseCase;
  }

  async findAll(): Promise<FindAllStoreCatalogProductsOutput> {
    const products = await this._findAllProductsUseCase.execute();
    return products;
  }

  async find(input: FindStoreCatalogProductInput): Promise<FindStoreCatalogProductOutput> {
    const product = await this._findProductByIdUseCase.execute({ productId: input.id });
    return product;
  }
}