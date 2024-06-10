import { Sequelize } from 'sequelize-typescript';
import Id from '../../@shared/value-object/id.value-object';
import TransactionModel from './TransactionModel';
import Transaction from '../entity/Transaction';
import TransactionRepository from './TransactionRepository';

describe('TransactionRepository', () => {
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
    // Arrange
    const transaction = new Transaction({
      id: new Id('1'),
      orderId: '123',
      amount: 100
    });
    transaction.process();
    const transactionRepository = new TransactionRepository();

    // Act
    const createdTransaction = await transactionRepository.create(transaction);

    // Assert
    expect(createdTransaction.id.value).toBe('1');
    expect(createdTransaction.orderId).toBe('123');
    expect(createdTransaction.amount).toBe(100);
    expect(createdTransaction.status).toBe('approved');

  });
});