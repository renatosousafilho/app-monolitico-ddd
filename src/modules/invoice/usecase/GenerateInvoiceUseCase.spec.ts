import Id from '../../@shared/domain/value-object/id.value-object';
import Invoice from '../domain/Invoice';
import InvoiceItem from '../domain/InvoiceItem';
import Address from '../domain/value-object/Address';
import InvoiceGateway from '../gateway/InvoiceGateway';
import GenerateInvoiceUseCase from './GenerateInvoiceUseCase';

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
  id:  new Id('1'),
  name: 'John Doe',
  document: '12345678901',
  address,
  items,
};

// Act
const invoice = new Invoice(props);

class InvoiceGatewayMock implements InvoiceGateway {
  async create(invoice: Invoice): Promise<void> {}
  async find(id: string): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }
}


describe('GenerateInvoiceUseCase', () => {
  it('should create an invoice', async () => {
    // Arrange
    const invoiceGateway = new InvoiceGatewayMock();
    invoiceGateway.create = jest.fn();
    const findInvoiceUseCase = new GenerateInvoiceUseCase(invoiceGateway);
    
    // Act
    const input = {
      name: 'John Doe',
      document: '12345678901',
      street: 'Main St',
      number: '100',
      complement: 'Apt 200',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      items: [
        {
          id: '1',
          name: 'Product 1',
          price: 50,
        },
        {
          id: '2',
          name: 'Product 2',
          price: 100,
        },
      ],
    };
    const result = await findInvoiceUseCase.execute(input);

    // Assert
    expect(invoiceGateway.create).toBeCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.street).toBe(invoice.address.street);
    expect(result.number).toBe(invoice.address.number);
    expect(result.complement).toBe(invoice.address.complement);
    expect(result.city).toBe(invoice.address.city);
    expect(result.state).toBe(invoice.address.state);
    expect(result.zipCode).toBe(invoice.address.zipCode);
    expect(result.items[0].id).toBe(invoice.items[0].id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id).toBe(invoice.items[1].id);
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.total).toBe(invoice.total);
  });
});