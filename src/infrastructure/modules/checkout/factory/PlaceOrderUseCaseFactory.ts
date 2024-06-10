import PlaceOrderUseCase from '../../../../domains/checkout/usecase/PlaceOrderUseCase';
import ClientAdminFacadeFactory from '../../client-adm/factory/ClientAdminFacadeFactory';
import InvoiceFacadeFactory from '../../invoice/factory/InvoiceFacadeFactory';
import PaymentFacadeFactory from '../../payment/factory/PaymentFacadeFactory';
import ProductAdminFacadeFactory from '../../product-adm/factory/ProductAdminFacadeFactory';
import StoreCatalogFacadeFactory from '../../store-catalog/factory/StoreCatalogFacadeFactory';
import OrderRepository from '../repository/OrderRepository';

export default class PlaceOrderUseCaseFactory {
  static create(): PlaceOrderUseCase {
    const orderRepository = new OrderRepository();
    const clientAdminFacade = ClientAdminFacadeFactory.create();
    const productAdminFacade = ProductAdminFacadeFactory.create();
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();
    return new PlaceOrderUseCase({
      orderRepository,
      clientAdminFacade,
      productAdminFacade,
      storeCatalogFacade,
      paymentFacade,
      invoiceFacade,
    });  
  }
}