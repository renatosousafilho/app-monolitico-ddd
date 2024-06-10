import supertest from 'supertest';
import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript';
import UmzugMigrator from '../../sequelize/migrator';
import ProductModel from '../../modules/product-adm/repository/ProductModel';
import productRoute from './product.route';

describe('product.route', () => {
  let app: Express = express();
  app.use(express.json());
  app.use("/products", productRoute);
  let sequelize: Sequelize;
  let migrator: UmzugMigrator;
  
  beforeEach(async () => {
    // app = express();
    // app.use(express.json());
    // app.use("/products", productRoute);
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

    // find the last product added using limit
    const productFound = await ProductModel.findOne({ where: { name: 'Product 1' } });
    expect(productFound).not.toBeNull();
    expect(productFound.id).toBe(response.body.id);
    expect(productFound.name).toBe(response.body.name);
    expect(productFound.description).toBe(response.body.description);
    expect(productFound.purchasePrice).toBe(response.body.purchasePrice);
    expect(productFound.stock).toBe(response.body.stock);
  });
});