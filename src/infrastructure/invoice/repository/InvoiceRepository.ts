import Id from '../../../domains/@shared/value-object/id.value-object';
import Invoice from '../../../domains/invoice/entity/Invoice';
import InvoiceItem from '../../../domains/invoice/entity/InvoiceItem';
import Address from '../../../domains/invoice/entity/value-object/Address';
import InvoiceGateway from '../../../domains/invoice/gateway/InvoiceGateway';
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

  async find(id: string): Promise<Invoice> {
    const invoiceFound = await InvoiceModel.findOne({ 
      where: { id },
      include: [{ model: InvoiceItemModel }]
    });

    const address = new Address({
      street: invoiceFound.street,
      number: invoiceFound.number,
      complement: invoiceFound.complement,
      city: invoiceFound.city,
      state: invoiceFound.state,
      zipCode: invoiceFound.zipcode,
    });

    const items = invoiceFound.items.map((item) => new InvoiceItem({
      id: item.id,
      name: item.name,
      price: item.price,
    }));

    const invoice = new Invoice({
      id: new Id(invoiceFound.id),
      name: invoiceFound.name,
      document: invoiceFound.document,
      address,
      items,
    });

    return invoice;
  }

}