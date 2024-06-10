import TransactionRepository from '../repository/TransactionRepository';
import ProcessPaymentUseCase from '../../../../domains/payment/usecase/ProcessPaymentUseCase';
import PaymentFacade from '../../../../domains/payment/facade/PaymentFacade';

export default class PaymentFacadeFactory {
  static create() {
    const repository = new TransactionRepository();
    const usecase = new ProcessPaymentUseCase(repository);
    return new PaymentFacade(usecase);
  }
}