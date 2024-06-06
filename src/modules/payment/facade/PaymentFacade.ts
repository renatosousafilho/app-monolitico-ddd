import ProcessPaymentUseCase from '../usecase/ProcessPaymentUseCase';

type CreatePaymentFacadeInput = {
  amount: number;
  orderId: string;
};

type CreatePaymentFacadeOutput = {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export default class PaymentFacade {
  private _processPaymentUseCase: ProcessPaymentUseCase;

  constructor(processPaymentUseCase: ProcessPaymentUseCase) {
    this._processPaymentUseCase = processPaymentUseCase;
  }

  async process(input: CreatePaymentFacadeInput): Promise<CreatePaymentFacadeOutput> {
    return await this._processPaymentUseCase.execute(input);
  }
}