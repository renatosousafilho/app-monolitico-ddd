import ClientGateway from '../gateway/ClientGateway';
import Client from '../domain/Client';
import { ClientModel } from './ClientModel';
import Id from '../../@shared/domain/value-object/id.value-object';

export default class ClientRepository implements ClientGateway {
  add(client: Client): Promise<Client> {
    throw new Error('Method not implemented.');
  }
  
  async find(id: string): Promise<Client> {
    const client = await ClientModel.findByPk(id);

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    });    
  }
  
}