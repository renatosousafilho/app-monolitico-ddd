import FindInvoiceUseCase from '../usecase/FindInvoiceUseCase';
import GenerateInvoiceUseCase from '../usecase/GenerateInvoiceUseCase';

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

export interface GenerateInvoiceFacadeInputDTO {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface GenerateInvoiceFacadeOutputDTO {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

export default class InvoiceFacade {
  private _findInvoiceUseCase: FindInvoiceUseCase;
  private _generateInvoiceUseCase: GenerateInvoiceUseCase;

  constructor(findInvoiceUseCase: FindInvoiceUseCase, generateInvoiceUseCase: GenerateInvoiceUseCase) {
    this._findInvoiceUseCase = findInvoiceUseCase;
    this._generateInvoiceUseCase = generateInvoiceUseCase;
  }

  async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    return this._findInvoiceUseCase.execute(input);
  }

  async generate(input: GenerateInvoiceFacadeInputDTO): Promise<GenerateInvoiceFacadeOutputDTO> {
    return this._generateInvoiceUseCase.execute(input);
  }
}