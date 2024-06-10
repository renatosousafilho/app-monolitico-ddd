import Order from '../entity/Order';
import OrderGateway from '../gateway/OrderGateway';
import { OrderItemModel } from './OrderItemModel';
import { OrderModel } from './OrderModel';

export default class OrderRepository implements OrderGateway {
  async add(order: Order): Promise<void> {
    const items = order.products.map(item => ({
      id: item.id.value,
      productName: item.name,
      productDescription: item.description,
      productSalesPrice: item.salesPrice,
    }));

    await OrderModel.create({
      id: order.id.value,
      clientName: order.client.name,
      clientEmail: order.client.email,
      clientAddress: order.client.address,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items,
    },  {
      include: [{ model: OrderItemModel }]
    });
  }

}