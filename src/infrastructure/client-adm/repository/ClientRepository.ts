import ClientGateway from '../../../domains/client-adm/gateway/ClientGateway';
import Client from '../../../domains/client-adm/entity/Client';
import { ClientModel } from './ClientModel';
import Id from '../../../domains/@shared/value-object/id.value-object';

export default class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.value,
      name: client.name,
      email: client.email,
      document: client.document,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }).catch(e => {
      console.error(e);
      throw new Error('Error adding client');
    });
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