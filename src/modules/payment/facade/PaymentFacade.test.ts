import { Sequelize } from 'sequelize-typescript';
import TransactionModel from '../repository/TransactionModel';
import TransactionRepository from '../repository/TransactionRepository';
import ProcessPaymentUseCase from '../usecase/ProcessPaymentUseCase';
import PaymentFacade from './PaymentFacade';


describe('PaymentFacade', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a transaction', async () => {
    const repository = new TransactionRepository();
    const usecase = new ProcessPaymentUseCase(repository);
    const facade = new PaymentFacade(usecase);
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