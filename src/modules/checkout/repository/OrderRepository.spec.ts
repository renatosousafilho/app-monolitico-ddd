import { Sequelize } from 'sequelize-typescript';
import Id from '../../@shared/domain/value-object/id.value-object';
import { OrderModel } from './OrderModel';
import Order from '../domain/Order';
import Client from '../domain/Client';
import OrderRepository from './OrderRepository';
import { OrderItemModel } from './OrderItemModel';
import Product from '../domain/Product';


describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([OrderModel, OrderItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should add an order', async () => {
    // Arrange
    const client = new Client({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      address: '123 Main St'
    });

    const product1 = new Product({
      id: new Id('1'),
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    });

    const product2 = new Product({
      id: new Id('2'),
      name: 'Product 2',
      description: 'Description 2',
      salesPrice: 50,
    });

    const products = [product1, product2];

    const order = new Order({
      client,
      products,
    });
    const orderRepository = new OrderRepository();

    // Act
    await orderRepository.add(order);

    // Assert
    const orderModel = await OrderModel.findOne({ 
      where: { id: order.id.value },
      include: [{ model: OrderItemModel }]
    });

    expect(orderModel).toBeDefined();
    expect(orderModel.id).toBe(order.id.value);
    expect(orderModel.clientName).toBe(order.client.name);
    expect(orderModel.clientEmail).toBe(order.client.email);
    expect(orderModel.clientAddress).toBe(order.client.address);
    expect(orderModel.items).toHaveLength(2);
    expect(orderModel.items[0].productName).toBe(product1.name);
    expect(orderModel.items[0].productDescription).toBe(product1.description);
    expect(orderModel.items[0].productSalesPrice).toBe(product1.salesPrice);
    expect(orderModel.items[1].productName).toBe(product2.name);
    expect(orderModel.items[1].productDescription).toBe(product2.description);
    expect(orderModel.items[1].productSalesPrice).toBe(product2.salesPrice);
  });
});