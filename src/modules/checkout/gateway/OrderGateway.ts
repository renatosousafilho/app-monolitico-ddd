import Order from '../domain/Order';

export default interface OrderGateway {
  add(order: Order): Promise<void>;
  find(id: string): Promise<Order | undefined>;
}