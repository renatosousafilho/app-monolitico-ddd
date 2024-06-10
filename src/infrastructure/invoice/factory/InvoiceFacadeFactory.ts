import InvoiceRepository from '../repository/InvoiceRepository';
import FindInvoiceUseCase from '../../../domains/invoice/usecase/FindInvoiceUseCase';
import GenerateInvoiceUseCase from '../../../domains/invoice/usecase/GenerateInvoiceUseCase';
import InvoiceFacade from '../../../domains/invoice/facade/InvoiceFacade';
import InvoiceFacadeInterface from '../../../domains/invoice/facade/InvoiceFacadeInterface';

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const invoiceRepository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
    return new InvoiceFacade(findInvoiceUseCase, generateInvoiceUseCase);
  }
}