import { Sequelize } from 'sequelize-typescript';
import express, { Express } from 'express';
import UmzugMigrator from '../../sequelize/migrator';
import { ClientModel } from '../../modules/client-adm/repository/ClientModel';
import ProductModel from '../../modules/store-catalog/repository/ProductModel';
import ProductModelAdm from '../../modules/product-adm/repository/ProductModel';
import TransactionModel from '../../modules/payment/repository/TransactionModel';
import { OrderModel } from '../../modules/checkout/repository/OrderModel';
import { OrderItemModel } from '../../modules/checkout/repository/OrderItemModel';
import { InvoiceModel } from '../../modules/invoice/repository/InvoiceModel';
import { InvoiceItemModel } from '../../modules/invoice/repository/InvoiceItemModel';
import checkoutRoute from './checkout.route';
import supertest from 'supertest';

describe('POST /checkout', () => {
  let app: Express = express();
  app.use(express.json());
  app.use("/checkout", checkoutRoute);
  let sequelize: Sequelize;
  let migrator: UmzugMigrator;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([
      ClientModel, 
      ProductModel, 
      ProductModelAdm, 
      TransactionModel, 
      OrderModel,
      OrderItemModel,
      InvoiceModel,
      InvoiceItemModel,
    ]);
    migrator = new UmzugMigrator(sequelize);
    await migrator.up();
  });

  afterEach(async () => {
    await migrator.down();
    await sequelize.close();
  });

  it('should return an order approved when payment has been approved', async function() {
    // Arrange
    await ClientModel.create({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      document: '12345678900',
      address: '123 Main St',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 10,
      salesPrice: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const body = {
      clientId: '1',
      products: [
        { productId: '1' }
      ]
    };

    // Act
    const response = await supertest(app)
      .post('/checkout')
      .send(body);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.status).toBe('approved');
    expect(response.body.total).toBe(10);
    expect(response.body.products).toStrictEqual(body.products);
  });
});