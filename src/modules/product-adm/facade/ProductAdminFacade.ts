import AddProductUseCase from '../usecase/AddProductUseCase';
import CheckStockProductUseCase, { CheckStockProductUseCaseInputDTO } from '../usecase/CheckStockProductUseCase';
import ProductAdminFacadeInterface, { AddProductAdminFacadeInputDTO } from './ProductAdminFacadeInterface';

export default class ProductAdminFacade implements ProductAdminFacadeInterface {
  private _addProductUseCase: AddProductUseCase;
  private _checkStockProductUseCase: CheckStockProductUseCase

  constructor(addProductUseCase: AddProductUseCase, checkStockProductUseCase: CheckStockProductUseCase) {
    this._addProductUseCase = addProductUseCase;
    this._checkStockProductUseCase = checkStockProductUseCase;
  }

  async addProduct(input: AddProductAdminFacadeInputDTO): Promise<void> {
    this._addProductUseCase.execute(input);
  }

  async checkStockProduct(input: CheckStockProductUseCaseInputDTO): Promise<{ productId: string, stock: number }> {
    return this._checkStockProductUseCase.execute(input);
  }
}