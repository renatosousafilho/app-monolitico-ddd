import ProcessPaymentUseCase from '../usecase/ProcessPaymentUseCase';
import PaymentFacadeInterface, { CreatePaymentFacadeInput, CreatePaymentFacadeOutput } from './PaymentFacadeInterface';

export default class PaymentFacade implements PaymentFacadeInterface {
  private _processPaymentUseCase: ProcessPaymentUseCase;

  constructor(processPaymentUseCase: ProcessPaymentUseCase) {
    this._processPaymentUseCase = processPaymentUseCase;
  }

  async process(input: CreatePaymentFacadeInput): Promise<CreatePaymentFacadeOutput> {
    return await this._processPaymentUseCase.execute(input);
  }
}