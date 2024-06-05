import Client from '../domain/Client';

export default interface ClientGateway {
  add(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}