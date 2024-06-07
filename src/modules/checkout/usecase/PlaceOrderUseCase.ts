import ClientAdminFacadeInterface from '../../client-adm/facade/ClientAdminFacadeInterface';

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
  private _clientAdminFacade: ClientAdminFacadeInterface;

  constructor(clientAdminFacade: ClientAdminFacadeInterface) {
    this._clientAdminFacade = clientAdminFacade;
  }

  async execute(input: PlaceOrderUseCaseInput): Promise<PlaceOrderUseCaseOutput> {
    const client = await this._clientAdminFacade.find({ id: input.clientId });
    if (!client) {
      throw new Error('Client not found');
    }

    if (input.products.length === 0) {
      throw new Error('Products are required');
    }

    return {
      id: 'order-id',
      invoiceId: 'invoice-id',
      status: 'pending',
      total: 0,
      products: []
    }
  }
}