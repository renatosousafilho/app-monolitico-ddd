import Id from '../../@shared/value-object/id.value-object';
import Transaction from '../entity/Transaction';
import TransactionGateway from '../gateway/TransactionGateway';
import ProcessPaymentUseCase from '../usecase/ProcessPaymentUseCase';
import PaymentFacade from './PaymentFacade';

class TransactionRepositoryMock implements TransactionGateway {
  async create(transaction: Transaction): Promise<Transaction> {
    return new Transaction({
      id: new Id('1'),
      orderId: '123',
      amount: 100,
      status: 'approved',
    });
  }
}

describe('PaymentFacade', () => {
  it('should create a transaction', async () => {
    const repository = new TransactionRepositoryMock();
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