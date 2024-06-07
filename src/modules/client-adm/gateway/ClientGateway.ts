import Client from '../entity/Client';

export default interface ClientGateway {
  add(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}