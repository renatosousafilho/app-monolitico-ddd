type FindAllStoreCatalogProductsOutput = {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }
}

type FindStoreCatalogProductInput = {
  id: string;
}

type FindStoreCatalogProductOutput = {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export default interface StoreCatalogFacadeInterface {
  findAll(): Promise<FindAllStoreCatalogProductsOutput>;
  find(input: FindStoreCatalogProductInput): Promise<FindStoreCatalogProductOutput>;
}