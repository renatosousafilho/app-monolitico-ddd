export type AddProductAdminFacadeInputDTO = {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
};

export type CheckStockProductAdminFacadeInputDTO = {
  productId: string;
};

export type CheckStockProductAdminFacadeOutputDTO = {
  productId: string;
  stock: number;
};

export default interface ProductAdminFacadeInterface {
  addProduct(product: AddProductAdminFacadeInputDTO): Promise<void>;
  checkStockProduct(input: CheckStockProductAdminFacadeInputDTO): Promise<CheckStockProductAdminFacadeOutputDTO>;
}