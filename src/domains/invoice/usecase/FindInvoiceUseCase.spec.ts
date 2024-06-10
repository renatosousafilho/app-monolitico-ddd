import Id from '../../@shared/domain/value-object/id.value-object';
import Invoice from '../entity/Invoice';
import InvoiceItem from '../entity/InvoiceItem';
import Address from '../entity/value-object/Address';
import InvoiceGateway from '../gateway/InvoiceGateway';
import FindInvoiceUseCase from './FindInvoiceUseCase';

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
  create(invoice: Invoice): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async find(id: string): Promise<Invoice> {
    return invoice;
  }
}


describe('FindInvoiceUseCase', () => {
  it('should find an invoice', async () => {
    // Arrange
    const invoiceGateway = new InvoiceGatewayMock();
    invoiceGateway.find = jest.fn().mockResolvedValue(invoice);
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceGateway);
    
    // Act
    const result = await findInvoiceUseCase.execute({ id: '1' });

    // Assert
    expect(invoiceGateway.find).toHaveBeenCalledTimes(1);
    expect(result.id).toBe(invoice.id.value);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    expect(result.items[0].id).toBe(invoice.items[0].id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id).toBe(invoice.items[1].id);
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.total).toBe(invoice.total);


  });
});