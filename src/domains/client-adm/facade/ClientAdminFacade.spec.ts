import AddClientUseCase from '../usecase/AddClientUseCase';
import ClientAdminFacade from './ClientAdminFacade';
import FindClientUseCase from '../usecase/FindClientUseCase';
import ClientGateway from '../gateway/ClientGateway';
import Client from '../entity/Client';
import Id from '../../@shared/value-object/id.value-object';

class ClientRepositoryMock implements ClientGateway {
  async add(client: Client): Promise<void> {}

  async find(id: string): Promise<Client> {
    return new Client({
      id: new Id('1'),
      name: 'John Doe',
      email: 'johndoe@mail.com',
      document: '12345678900',
      address: '123 Main St'
    });
  }
}

describe('ProductRepository', () => {
  it('shoud add a client', async () => {
    // Arrange
    const clientRepository = new ClientRepositoryMock();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const findClientUseCase = new FindClientUseCase(clientRepository);
    const clientAdminFacade = new ClientAdminFacade(addClientUseCase, findClientUseCase);
    const input = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      document: '12345678900',
      address: '123 Main St'
    };

    // Act
    const output = await clientAdminFacade.add(input);

    // Assert
    expect(output).toBeDefined();
    expect(output.id).toBe(input.id);
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.document).toBe(input.document);
    expect(output.address).toBe(input.address);  
  });

  it('shoud find a client', async () => {
    // Arrange
    const clientRepository = new ClientRepositoryMock();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const findClientUseCase = new FindClientUseCase(clientRepository);
    const clientAdminFacade = new ClientAdminFacade(addClientUseCase, findClientUseCase);

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