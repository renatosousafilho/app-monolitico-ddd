type PlaceOrderUseCaseInput = {
  clientId: string;
  products: {
    productId: string;
  }[];
}

type PlaceOrderUseCaseOutput = {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[];
}

export default class PlaceOrderUseCase {
  async execute(input: PlaceOrderUseCaseInput): Promise<PlaceOrderUseCaseOutput> {
    return {
      id: 'order-id',
      invoiceId: 'invoice-id',
      status: 'pending',
      total: 0,
      products: []
    }
  }
}