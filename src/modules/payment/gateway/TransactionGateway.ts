import Transaction from '../domain/Transaction';

export default interface PaymentGateway {
  create(transaction: Transaction): Promise<Transaction>;
}