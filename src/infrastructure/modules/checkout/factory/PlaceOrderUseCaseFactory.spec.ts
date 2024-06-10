import { Sequelize } from 'sequelize-typescript';
import UmzugMigrator from '../../../sequelize/migrator';
import PlaceOrderUseCaseFactory from './PlaceOrderUseCaseFactory';
import ClientModel from '../../client-adm/repository/ClientModel';
import ProductModel from '../../store-catalog/repository/ProductModel';
import ProductModelAdm from '../../product-adm/repository/ProductModel';
import TransactionModel from '../../payment/repository/TransactionModel';
import OrderModel from '../repository/OrderModel';
import OrderItemModel from '../repository/OrderItemModel';
import InvoiceModel from '../../invoice/repository/InvoiceModel';
import InvoiceItemModel from '../../invoice/repository/InvoiceItemModel';

describe('PlaceOrderUseCaseFactory', () => {
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
    const placeOrderUseCase = PlaceOrderUseCaseFactory.create();
    const input = {
      clientId: '1',
      products: [
        { productId: '1' }
      ]
    };

    // Act
    const output = await placeOrderUseCase.execute(input);

    // Assert
    expect(output.id).toBeDefined();
    expect(output.invoiceId).toBeDefined();
    expect(output.status).toBe('approved');
    expect(output.total).toBe(10);
    expect(output.products).toStrictEqual(input.products);
  });
});