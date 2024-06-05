import { Sequelize } from 'sequelize-typescript';
import Id from '../../@shared/domain/value-object/id.value-object';
import { ClientModel } from './ClientModel';
import ClientRepository from './ClientRepository';

describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a client', async () => {
    // Arrange
    await ClientModel.create({ 
      id: '1', 
      name: 'John Doe',
      email: 'johndoe@mail.com',
      document: '12345678900',
      address: '123 Main St',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const clientRepository = new ClientRepository();

    // Act
    const client = await clientRepository.find('1');

    // Assert
    expect(client).toBeDefined();
    expect(client.id.value).toBe('1');
    expect(client.name).toBe('John Doe');
    expect(client.email).toBe('johndoe@mail.com');
    expect(client.document).toBe('12345678900');
    expect(client.address).toBe('123 Main St');
    expect(client.createdAt).toBeDefined();
    expect(client.updatedAt).toBeDefined();
  });
});