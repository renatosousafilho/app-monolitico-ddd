import { Sequelize } from 'sequelize-typescript';
import { InvoiceModel } from '../repository/InvoiceModel';
import { InvoiceItemModel } from '../repository/InvoiceItemModel';
import FindInvoiceUseCase from '../usecase/FindInvoiceUseCase';
import InvoiceFacade from './InvoiceFacade';
import InvoiceRepository from '../repository/InvoiceRepository';

describe('InvoiceFacade', () => {
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
    }, {
      include: [{ model: InvoiceItemModel }]
    });
    const repository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);
    const facade = new InvoiceFacade(new FindInvoiceUseCase(new InvoiceRepository()));
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
});