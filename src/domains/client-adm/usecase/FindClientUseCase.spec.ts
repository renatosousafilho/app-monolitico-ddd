import Id from '../../@shared/value-object/id.value-object';
import Client from '../entity/Client';
import ClientGateway from '../gateway/ClientGateway';
import FindClientUseCase from './FindClientUseCase';

class ClientRepositoryMock implements ClientGateway {
  async add(client: Client): Promise<void> {}

  async find(id: string): Promise<Client> {
    return new Client({
      id: new Id('123'),
      name: 'John Doe',
      email: 'johndoe@mail.com',
      document: '12345678900',
      address: '123 Main St'
    });
  }

}

describe('FindClientUseCase', () => {
  it('should find a client', async () => {
    // Arrange
    const clientRepository = new ClientRepositoryMock();
    const addClientUseCase = new FindClientUseCase(clientRepository);
    const input = { id: '123' };

    // Act
    const client = await addClientUseCase.execute(input);

    // Assert
    expect(client).toBeDefined();
    expect(client.id).toBeDefined();
    expect(client.name).toBe('John Doe');
    expect(client.email).toBe('johndoe@mail.com');
    expect(client.document).toBe('12345678900');
    expect(client.address).toBe('123 Main St');
  });
});