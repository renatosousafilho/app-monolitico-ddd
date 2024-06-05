import Id from '../../@shared/domain/value-object/id.value-object';
import Transaction from '../domain/Transaction';
import TransactionGateway from '../gateway/TransactionGateway';
import TransactionModel from './TransactionModel';

export default class TransactionRepository implements TransactionGateway {
  async create(transaction: Transaction): Promise<Transaction> {
    const createdTransaction = await TransactionModel.create({
      id: transaction.id.value,
      orderId: transaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });

    return new Transaction({
      id: new Id(createdTransaction.id),
      orderId: createdTransaction.orderId,
      amount: createdTransaction.amount,
      status: createdTransaction.status,
      createdAt: createdTransaction.createdAt,
      updatedAt: createdTransaction.updatedAt,
    });
  }
}