import supertest from 'supertest';
import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript';
import UmzugMigrator from '../../sequelize/migrator';
import clientRoute from './client.route';
import ClientModel from '../../modules/client-adm/repository/ClientModel';

describe('product.route', () => {
  let app: Express = express();
  app.use(express.json());
  app.use("/clients", clientRoute);
  let sequelize: Sequelize;
  let migrator: UmzugMigrator;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ClientModel]);
    migrator = new UmzugMigrator(sequelize);
    await migrator.up();
  });

  afterEach(async () => {
    await migrator.down();
    await sequelize.close();
  });
  
  it('POST /clients', async () => {
    const response = await supertest(app)
      .post('/clients')
      .send({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        document: '12345678900',
        address: '123 Main St'
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('johndoe@mail.com');
    expect(response.body.document).toBe('12345678900');
    expect(response.body.address).toBe('123 Main St');

    // find the last product added using limit
    const clientFound = await ClientModel.findOne({ where: { name: 'John Doe' } });
    expect(clientFound).not.toBeNull();
    expect(clientFound.id).toBe(response.body.id);
    expect(clientFound.name).toBe(response.body.name);
    expect(clientFound.email).toBe(response.body.email);
    expect(clientFound.document).toBe(response.body.document);
    expect(clientFound.address).toBe(response.body.address);
  });
});