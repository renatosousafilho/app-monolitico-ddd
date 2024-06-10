import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../repository/ProductModel';
import ProductAdminFacadeFactory from './ProductAdminFacadeFactory';
import UmzugMigrator from '../../../sequelize/migrator';

describe('ProductRepositoryAdminFacadeFactory', () => {
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

  it('should create a product', async () => {
    const productFacade = ProductAdminFacadeFactory.create();

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 10,
      stock: 10,
    };
    

    await productFacade.addProduct(input);

    const productFound = await ProductModel.findOne({ where: { name: input.name } });
    expect(productFound).not.toBeNull();
    expect(productFound.id).toBe(input.id);
    expect(productFound.name).toBe(input.name);
    expect(productFound.description).toBe(input.description);
    expect(productFound.purchasePrice).toBe(input.purchasePrice);
    expect(productFound.stock).toBe(input.stock);
  });

  it('should check stock of a product', async () => {
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
    const productFacade = ProductAdminFacadeFactory.create();

    // Act
    const input = { productId: '1' };
    const output = await productFacade.checkStockProduct(input);

    // Assert
    expect(output.productId).toBe(input.productId);
    expect(output.stock).toBe(10);
  });
});