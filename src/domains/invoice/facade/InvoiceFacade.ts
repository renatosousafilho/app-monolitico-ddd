import FindInvoiceUseCase from '../usecase/FindInvoiceUseCase';
import GenerateInvoiceUseCase from '../usecase/GenerateInvoiceUseCase';
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDTO, GenerateInvoiceFacadeOutputDTO } from './InvoiceFacadeInterface';

export default class InvoiceFacade implements InvoiceFacadeInterface {
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