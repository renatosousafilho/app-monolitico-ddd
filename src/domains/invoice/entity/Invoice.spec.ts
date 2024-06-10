import Invoice from './Invoice';
import InvoiceItem from './InvoiceItem';
import Address from './value-object/Address';

describe('Invoice', () => {
  it('should create an invoice', () => {
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

    // Act
    const invoice = new Invoice(props);

    // Assert
    expect(invoice.name).toBe('John Doe');
    expect(invoice.document).toBe('12345678901');
    expect(invoice.address).toBe(address);
    expect(invoice.items).toBe(items);
    expect(invoice.createdAt).toBeDefined();
    expect(invoice.updatedAt).toBeDefined();
    expect(invoice.total).toBe(150);
  });
});