import Id from '../../@shared/domain/value-object/id.value-object';
import Transaction from '../entity/Transaction';
import TransactionGateway from '../gateway/TransactionGateway';
import ProcessPaymentUseCase from './ProcessPaymentUseCase';

const transaction1 = new Transaction({
  id: new Id('1'),
  orderId: '123',
  amount: 100,
  status: 'approved',
});

const transaction2 = new Transaction({
  id: new Id('1'),
  orderId: '123',
  amount: 50,
  status: 'declined',
});

class TransactionRepositoryMock implements TransactionGateway {
  async create(transaction: Transaction): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }
}

describe('ProcessPaymentUseCase', () => {
  it('should create a transaction approved and return the transaction details', async () => {
    // Arrange
    const transactionRepository = new TransactionRepositoryMock();
    transactionRepository.create = jest.fn().mockResolvedValue(transaction1);
    const usecase = new ProcessPaymentUseCase(transactionRepository);

    // Act
    const result = await usecase.execute({
      orderId: '123',
      amount: 100
    });

    // Assert
    expect(result.transactionId).toBe('1');
    expect(result.orderId).toBe('123');
    expect(result.amount).toBe(100);
    expect(result.status).toBe('approved');
  });

  it('should create a transaction declined and return the transaction details', async () => {
    // Arrange
    const transactionRepository = new TransactionRepositoryMock();
    transactionRepository.create = jest.fn().mockResolvedValue(transaction2);
    const usecase = new ProcessPaymentUseCase(transactionRepository);

    // Act
    const result = await usecase.execute({
      orderId: '123',
      amount: 50
    });

    // Assert
    expect(result.transactionId).toBe('1');
    expect(result.orderId).toBe('123');
    expect(result.amount).toBe(50);
    expect(result.status).toBe('declined');
  });

});