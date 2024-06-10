import Order from '../entity/Order';

export default interface OrderGateway {
  add(order: Order): Promise<void>;
}