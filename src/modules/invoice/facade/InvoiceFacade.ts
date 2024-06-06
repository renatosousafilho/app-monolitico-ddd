import FindInvoiceUseCase from '../usecase/FindInvoiceUseCase';

export interface FindInvoiceFacadeInputDTO {
  id: string;
}

export interface FindInvoiceFacadeOutputDTO {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}

export default class InvoiceFacade {
  private _findInvoiceUseCase: FindInvoiceUseCase;

  constructor(findInvoiceUseCase: FindInvoiceUseCase) {
    this._findInvoiceUseCase = findInvoiceUseCase;
  }

  async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    return this._findInvoiceUseCase.execute(input);
  }
}