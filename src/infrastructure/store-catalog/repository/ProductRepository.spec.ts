import { Sequelize } from 'sequelize-typescript';
import Id from '../../../domains/@shared/value-object/id.value-object';
import ProductModel from './ProductModel';
import ProductRepository from './ProductRepository';
import UmzugMigrator from '../../sequelize/migrator';

describe('ProductRepository', () => {
  let sequelize: Sequelize;
  let migrator: UmzugMigrator;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    migrator = new UmzugMigrator(sequelize);
    await migrator.up();
  });

  afterEach(async () => {
    await migrator.down();
    await sequelize.close();
  });

  it('should find all products', async () => {
    // Arrange
    await ProductModel.bulkCreate([
      { id: '1', name: 'Product 1', description: 'Description 1', salesPrice: 10 },
      { id: '2', name: 'Product 2', description: 'Description 2', salesPrice: 20 },
    ]).catch(console.error);
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
  });

  it('should find a product by id', async () => {
    // Arrange
    await ProductModel.create({ id: '1', name: 'Product 1', description: 'Description 1', salesPrice: 10 });
    const productRepository = new ProductRepository();

    // Act
    const product = await productRepository.findById('1');

    // Assert
    expect(product.id.value).toBe('1');
    expect(product.name).toBe('Product 1');
    expect(product.description).toBe('Description 1');
    expect(product.salesPrice).toBe(10);
  });
});