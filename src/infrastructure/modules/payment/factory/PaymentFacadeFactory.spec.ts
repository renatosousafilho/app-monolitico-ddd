import { Sequelize } from 'sequelize-typescript';
import TransactionModel from '../repository/TransactionModel';
import PaymentFacadeFactory from './PaymentFacadeFactory';
import UmzugMigrator from '../../../sequelize/migrator';


describe('PaymentFacadeFactory', () => {
  let sequelize: Sequelize;
  let migrator: UmzugMigrator;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([TransactionModel]);
    migrator = new UmzugMigrator(sequelize);
    await migrator.up();
  });

  afterEach(async () => {
    await migrator.down();
    await sequelize.close();
  });

  it('should create a transaction', async () => {
    const facade = PaymentFacadeFactory.create();
    const input = {
      amount: 100,
      orderId: '123',
    };

    // Act
    const output = await facade.process(input);

    // Assert
    expect(output.transactionId).toBeDefined();
    expect(output.orderId).toBe(input.orderId);
    expect(output.amount).toBe(input.amount);
    expect(output.status).toBe('approved');
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  });
});