import InvoiceRepository from '../repository/InvoiceRepository';
import FindInvoiceUseCase from '../usecase/FindInvoiceUseCase';
import GenerateInvoiceUseCase from '../usecase/GenerateInvoiceUseCase';
import InvoiceFacade from './InvoiceFacade';
import InvoiceFacadeInterface from './InvoiceFacadeInterface';

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const invoiceRepository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
    return new InvoiceFacade(findInvoiceUseCase, generateInvoiceUseCase);
  }
}