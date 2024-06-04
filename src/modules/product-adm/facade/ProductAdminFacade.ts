import AddProductUseCase from '../usecase/AddProductUseCase';
import ProductAdminFacadeInterface, { AddProductAdminFacadeInputDTO } from './ProductAdminFacadeInterface';

export default class ProductAdminFacade implements ProductAdminFacadeInterface {
  private _addProductUseCase: AddProductUseCase;

  constructor(addProductUseCase: AddProductUseCase) {
    this._addProductUseCase = addProductUseCase;
  }

  async addProduct(input: AddProductAdminFacadeInputDTO): Promise<void> {
    this._addProductUseCase.execute(input);
  }
}