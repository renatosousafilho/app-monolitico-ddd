export type AddProductAdminFacadeInputDTO = {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
};

export default interface ProductAdminFacadeInterface {
  addProduct(product: AddProductAdminFacadeInputDTO): Promise<void>;
}