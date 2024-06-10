import Transaction from '../entity/Transaction';

export default interface PaymentGateway {
  create(transaction: Transaction): Promise<Transaction>;
}