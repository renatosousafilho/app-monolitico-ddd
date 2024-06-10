export type AddProductAdminFacadeInputDTO = {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
};

export type AddProductAdminFacadeOutputDTO = {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt: Date; 
  updatedAt: Date;
};

export type CheckStockProductAdminFacadeInputDTO = {
  productId: string;
};

export type CheckStockProductAdminFacadeOutputDTO = {
  productId: string;
  stock: number;
};

export default interface ProductAdminFacadeInterface {
  addProduct(product: AddProductAdminFacadeInputDTO): Promise<AddProductAdminFacadeOutputDTO>;
  checkStockProduct(input: CheckStockProductAdminFacadeInputDTO): Promise<CheckStockProductAdminFacadeOutputDTO>;
}