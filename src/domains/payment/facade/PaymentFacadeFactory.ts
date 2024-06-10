import TransactionRepository from '../../../infrastructure/payment/repository/TransactionRepository';
import ProcessPaymentUseCase from '../usecase/ProcessPaymentUseCase';
import PaymentFacade from './PaymentFacade';

export default class PaymentFacadeFactory {
  static create() {
    const repository = new TransactionRepository();
    const usecase = new ProcessPaymentUseCase(repository);
    return new PaymentFacade(usecase);
  }
}