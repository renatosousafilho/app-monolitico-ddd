import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../repository/ProductModel';
import ProductAdminFacade from './ProductAdminFacade';
import AddProductUseCase from '../usecase/AddProductUseCase';
import ProductRepository from '../repository/ProductRepository';
import ProductAdminFacadeFactory from './ProductAdminFacadeFactory';

describe('ProductRepositoryAdminFacadeFactory', () => {
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
  })
});