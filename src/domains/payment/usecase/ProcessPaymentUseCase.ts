import Transaction from '../entity/Transaction';
import TransactionGateway from '../gateway/TransactionGateway';

type ProcessPaymentUseCaseInput = {
  orderId: string;
  amount: number;
};

type ProcessPaymentUseCaseOutput = {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class ProcessPaymentUseCase {
  private _transactionRepository: TransactionGateway;

  constructor(transactionRepository: TransactionGateway) {
    this._transactionRepository = transactionRepository;
  }

  async execute(input: ProcessPaymentUseCaseInput): Promise<ProcessPaymentUseCaseOutput> {
    const transaction = new Transaction({
      orderId: input.orderId,
      amount: input.amount,
    });
    transaction.process();

    const createdTransaction = await this._transactionRepository.create(transaction);

    return {
      transactionId: createdTransaction.id.value,
      orderId: createdTransaction.orderId,
      amount: createdTransaction.amount,
      status: createdTransaction.status,
      createdAt: createdTransaction.createdAt,
      updatedAt: createdTransaction.updatedAt,
    };
  }  
}