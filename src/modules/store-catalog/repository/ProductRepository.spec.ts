import { Sequelize } from 'sequelize-typescript';
import Id from '../../@shared/domain/value-object/id.value-object';
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

  it('should find all products', async () => {
    // Arrange
    await ProductModel.bulkCreate([
      { id: '1', name: 'Product 1', description: 'Description 1', salesPrice: 10 },
      { id: '2', name: 'Product 2', description: 'Description 2', salesPrice: 20 },
    ]);
    const productRepository = new ProductRepository();

    // Act
    const products = await productRepository.findAll();

    // Assert
    expect(products).toHaveLength(2);
    expect(products[0].id.value).toBe('1');
    expect(products[0].name).toBe('Product 1');
    expect(products[0].description).toBe('Description 1');
    expect(products[0].salesPrice).toBe(10);
    expect(products[1].id.value).toBe('2');
    expect(products[1].name).toBe('Product 2');
    expect(products[1].description).toBe('Description 2');
    expect(products[1].salesPrice).toBe(20);
  })
});