import Client from '../domain/Client';
import ClientGateway from '../gateway/ClientGateway';
import AddClientUseCase from './AddClientUseCase';

class ClientRepositoryMock implements ClientGateway {
  async add(client: Client): Promise<void> {}

  find(id: string): Promise<Client> {
    throw new Error('Method not implemented.');
  }
}

describe('AddClientUseCase', () => {
  it('should add a client', async () => {
    // Arrange
    const clientRepository = new ClientRepositoryMock();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const input = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      document: '12345678900',
      address: '123 Main St'
    };

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