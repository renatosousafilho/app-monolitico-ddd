import { Sequelize } from 'sequelize-typescript';
import Id from '../../@shared/domain/value-object/id.value-object';
import Product from '../entity/product.entity';
import ProductModel from './ProductModel';
import ProductRepository from './ProductRepository';

describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should add a product', async () => {
    // Arrange
    const props = {
      id: new Id('1'),
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 10,
      stock: 10,
    };
    const product = new Product(props);
    const productRepository = new ProductRepository();

    // Act
    await productRepository.add(product);

    // Assert
    const productFound = await ProductModel.findByPk(product.id.value);
    expect(productFound.id).toBe(product.id.value);
    expect(productFound.name).toBe(product.name);
    expect(productFound.description).toBe(product.description);
    expect(productFound.purchasePrice).toBe(product.purchasePrice);
    expect(productFound.stock).toBe(product.stock);
    expect(productFound.createdAt.toISOString()).toBe(product.createdAt.toISOString());
    expect(productFound.updatedAt.toISOString()).toBe(product.updatedAt.toISOString());
  });

  it('should find a product by id', async () => {
    // Arrange
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const productRepository = new ProductRepository();

    // Act
    const product = await productRepository.find('1');

    // Assert
    expect(product).toBeDefined();
    expect(product.id.value).toBe('1');
    expect(product.name).toBe('Product 1');
    expect(product.description).toBe('Description 1');
    expect(product.purchasePrice).toBe(10);
    expect(product.stock).toBe(10);
  });
});