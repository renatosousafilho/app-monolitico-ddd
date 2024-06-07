import Invoice from '../entity/Invoice';

export default interface InvoiceGateway {
  create(invoice: Invoice): Promise<void>;
  find(id: string): Promise<Invoice>;
}