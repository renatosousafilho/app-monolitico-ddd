import { Sequelize } from 'sequelize-typescript';
import Id from '../../@shared/domain/value-object/id.value-object';
import { InvoiceModel } from './InvoiceModel';
import { InvoiceItemModel } from './InvoiceItemModel';
import Address from '../entity/value-object/Address';
import InvoiceItem from '../entity/InvoiceItem';
import Invoice from '../entity/Invoice';
import InvoiceRepository from './InvoiceRepository';

describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a invoice with items', async () => {
    // Arrange
    const address = new Address({
      street: 'Main St',
      number: '100',
      complement: 'Apt 200',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
    });
    const item1 = new InvoiceItem({
      id: '1',
      name: 'Product 1',
      price: 50,
    });
    const item2 = new InvoiceItem({
      id: '2',
      name: 'Product 2',
      price: 100,
    });
    const items = [item1, item2];

    const props = {
      name: 'John Doe',
      document: '12345678901',
      address,
      items,
    };

    const invoice = new Invoice(props);
    const repository = new InvoiceRepository();

    // Act
    await repository.create(invoice);

    // Assert
    const createdInvoice = await InvoiceModel.findOne({ 
      where: { id: invoice.id.value },
      include: [{ model: InvoiceItemModel }]
    });
    expect(createdInvoice).toBeDefined();
    expect(createdInvoice.name).toBe(invoice.name);
    expect(createdInvoice.document).toBe(invoice.document);
    expect(createdInvoice.street).toBe(invoice.address.street);
    expect(createdInvoice.number).toBe(invoice.address.number);
    expect(createdInvoice.complement).toBe(invoice.address.complement);
    expect(createdInvoice.city).toBe(invoice.address.city);
    expect(createdInvoice.zipcode).toBe(invoice.address.zipCode);
    expect(createdInvoice.items).toHaveLength(2);
    expect(createdInvoice.items[0].id).toBe(invoice.items[0].id);
    expect(createdInvoice.items[0].name).toBe(invoice.items[0].name);
    expect(createdInvoice.items[0].price).toBe(invoice.items[0].price);
    expect(createdInvoice.items[1].id).toBe(invoice.items[1].id);
    expect(createdInvoice.items[1].name).toBe(invoice.items[1].name);
    expect(createdInvoice.items[1].price).toBe(invoice.items[1].price);
  });

  it('should find an invoice', async () => {
    // Arrange
    const item1 = {
      id: '1',
      name: 'Product 1',
      price: 50,
    };
    const item2 = {
      id: '2',
      name: 'Product 2',
      price: 100,
    };
    const items = [item1, item2];

    await InvoiceModel.create({
      id: '1',
      name: 'John Doe',
      document: '12345678901',
      street: 'Main St',
      number: '100',
      complement: 'Apt 200',
      city: 'Springfield',
      state: 'IL',
      zipcode: '62701',
      items,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { include: [{ model: InvoiceItemModel }]});
    const repository = new InvoiceRepository();

    // Act
    const invoiceFound = await repository.find('1');

    // Assert
    expect(invoiceFound.id.value).toBe('1');
    expect(invoiceFound.name).toBe('John Doe');
    expect(invoiceFound.document).toBe('12345678901');
    expect(invoiceFound.address.street).toBe('Main St');
    expect(invoiceFound.address.number).toBe('100');
    expect(invoiceFound.address.complement).toBe('Apt 200');
    expect(invoiceFound.address.city).toBe('Springfield');
    expect(invoiceFound.address.zipCode).toBe('62701'); 
    expect(invoiceFound.items).toHaveLength(2);
    expect(invoiceFound.items[0].id).toBe('1');
    expect(invoiceFound.items[0].name).toBe('Product 1');
    expect(invoiceFound.items[0].price).toBe(50);
    expect(invoiceFound.items[1].id).toBe('2');
    expect(invoiceFound.items[1].name).toBe('Product 2');
    expect(invoiceFound.items[1].price).toBe(100);
  })
});
