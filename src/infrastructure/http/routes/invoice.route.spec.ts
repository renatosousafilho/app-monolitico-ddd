import supertest from 'supertest';
import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript';
import UmzugMigrator from '../../sequelize/migrator';
import InvoiceModel from '../../modules/invoice/repository/InvoiceModel';
import InvoiceItemModel from '../../modules/invoice/repository/InvoiceItemModel';
import invoiceRoute from './invoice.route';

describe('invoice.route', () => {
  let app: Express = express();
  app.use(express.json());
  app.use("/invoices", invoiceRoute);
  let sequelize: Sequelize;
  let migrator: UmzugMigrator;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    migrator = new UmzugMigrator(sequelize);
    await migrator.up();
  });

  afterEach(async () => {
    await migrator.down();
    await sequelize.close();
  });
  
  it('GET /invoices/:id', async () => {
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

    // Act
    const response = await supertest(app)
      .get('/invoices/1');

    expect(response.body.id).toBe('1');
    expect(response.body.name).toBe('John Doe');
    expect(response.body.document).toBe('12345678901');
    expect(response.body.total).toBe(150);
    expect(response.body.address.street).toBe('Main St');
    expect(response.body.address.number).toBe('100');
    expect(response.body.address.complement).toBe('Apt 200');
    expect(response.body.address.city).toBe('Springfield');
    expect(response.body.address.state).toBe('IL');
    expect(response.body.address.zipCode).toBe('62701');
    expect(response.body.items.length).toBe(2);
    expect(response.body.items[0].id).toBe('1');
    expect(response.body.items[0].name).toBe('Product 1');
    expect(response.body.items[0].price).toBe(50);
    expect(response.body.items[1].id).toBe('2');
    expect(response.body.items[1].name).toBe('Product 2');
    expect(response.body.items[1].price).toBe(100);
  });
});