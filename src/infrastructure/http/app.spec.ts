import supertest from 'supertest';
import app from './app';
import { Sequelize } from 'sequelize-typescript';
import UmzugMigrator from '../sequelize/migrator';
import ProductModel from '../modules/product-adm/repository/ProductModel';

describe('App', () => {
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
  
  it('POST /products', async () => {
    const response = await supertest(app)
      .post('/products')
      .send({
        name: 'Product 1',
        description: 'Description 1',
        purchasePrice: 10,
        stock: 10,
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe('Product 1');
    expect(response.body.description).toBe('Description 1');
    expect(response.body.purchasePrice).toBe(10);
    expect(response.body.stock).toBe(10);
  });
});