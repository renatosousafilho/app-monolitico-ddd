import Invoice from '../domain/Invoice';
import InvoiceGateway from '../gateway/InvoiceGateway';
import { InvoiceItemModel } from './InvoiceItemModel';
import { InvoiceModel } from './InvoiceModel';

export default class InvoiceRepository implements InvoiceGateway {
  async create(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.value,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipcode: invoice.address.zipCode,
      items: invoice.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }, {
      include: [{ model: InvoiceItemModel }]
    });
  }
  find(id: string): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }

}