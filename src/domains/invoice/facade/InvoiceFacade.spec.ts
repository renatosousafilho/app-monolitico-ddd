import FindInvoiceUseCase from '../usecase/FindInvoiceUseCase';
import InvoiceFacade from './InvoiceFacade';
import GenerateInvoiceUseCase from '../usecase/GenerateInvoiceUseCase';
import Address from '../entity/value-object/Address';
import InvoiceItem from '../entity/InvoiceItem';
import Id from '../../@shared/value-object/id.value-object';
import InvoiceGateway from '../gateway/InvoiceGateway';
import Invoice from '../entity/Invoice';

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

const invoice = new Invoice({
  id:  new Id('1'),
  name: 'John Doe',
  document: '12345678901',
  address,
  items,
});

class InvoiceRepositoryMock implements InvoiceGateway {
  async create(invoice: Invoice): Promise<void> {}
  async find(id: string): Promise<Invoice> {
    return invoice;
  }
}

describe('InvoiceFacade', () => {
  it('should find an invoice', async () => {
    // Arrange
    const repository = new InvoiceRepositoryMock();
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade(findInvoiceUseCase, generateInvoiceUseCase);
    const input = { id: '1' };

    // Act
    const output = await facade.find(input);

    // Assert
    expect(output.id).toBe('1');
    expect(output.name).toBe('John Doe');
    expect(output.document).toBe('12345678901');
    expect(output.total).toBe(150);
    expect(output.address.street).toBe('Main St');
    expect(output.address.number).toBe('100');
    expect(output.address.complement).toBe('Apt 200');
    expect(output.address.city).toBe('Springfield');
    expect(output.address.state).toBe('IL');
    expect(output.address.zipCode).toBe('62701');
    expect(output.items.length).toBe(2);
    expect(output.items[0].id).toBe('1');
    expect(output.items[0].name).toBe('Product 1');
    expect(output.items[0].price).toBe(50);
    expect(output.items[1].id).toBe('2');
    expect(output.items[1].name).toBe('Product 2');
    expect(output.items[1].price).toBe(100);
  })

  it('should generate an invoice', async () => {
    // Arrange
    const repository = new InvoiceRepositoryMock();
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade(findInvoiceUseCase, generateInvoiceUseCase);
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

    // Act
    const output = await facade.generate(input);

    // Assert
    expect(output.id).toBeDefined();
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.street);
    expect(output.number).toBe(input.number);
    expect(output.complement).toBe(input.complement);
    expect(output.city).toBe(input.city);
    expect(output.state).toBe(input.state);
    expect(output.zipCode).toBe(input.zipCode);
    expect(output.items[0].id).toBe(input.items[0].id);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
    expect(output.items[1].id).toBe(input.items[1].id);
    expect(output.items[1].name).toBe(input.items[1].name);
    expect(output.items[1].price).toBe(input.items[1].price);
    expect(output.total).toBe(150);
  });
});