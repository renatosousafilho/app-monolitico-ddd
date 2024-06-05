import Client from '../domain/Client';

export default interface ClientGateway {
  add(client: Client): Promise<Client>;
  find(id: string): Promise<Client>;
}