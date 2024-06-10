import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../repository/ClientModel';
import ClientAdminFacadeFactory from './ClientAdminFacadeFactory';
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
    await sequelize.addModels([ClientModel]);
    migrator = new UmzugMigrator(sequelize);
    await migrator.up();
  });

  afterEach(async () => {
    await migrator.down();
    await sequelize.close();
  });

  it('shoud add a client', async () => {
    // Arrange
    const clientAdminFacade = ClientAdminFacadeFactory.create();
    const input = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      document: '12345678900',
      address: '123 Main St'
    };

    // Act
    await clientAdminFacade.add(input);

    // Assert
    const client = await ClientModel.findOne({ where: { name: 'John Doe' } });
    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.document).toBe(input.document);
    expect(client.address).toBe(input.address);  
  });

  it('shoud find a client', async () => {
    // Arrange
    const clientAdminFacade = ClientAdminFacadeFactory.create();
    await ClientModel.create({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      document: '12345678900',
      address: '123 Main St',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Act
    const client = await clientAdminFacade.find({ id: '1' });

    // Assert
    expect(client).toBeDefined();
    expect(client.id).toBe('1');
    expect(client.name).toBe('John Doe');
    expect(client.email).toBe('johndoe@mail.com');
    expect(client.document).toBe('12345678900');
    expect(client.address).toBe('123 Main St');
  });
});