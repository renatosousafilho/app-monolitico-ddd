import Id from '../../@shared/value-object/id.value-object';
import Client from '../entity/Client';
import ClientGateway from '../gateway/ClientGateway';

type AddClientUseCaseInput = { 
  id?: string;
  name: string;
  email: string;
  document: string;
  address: string;
};

type AddClientUseCaseOutput = {
  id: string;
  name: string;
  email: string;
  document: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
};

export default class AddClientUseCase {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: AddClientUseCaseInput): Promise<AddClientUseCaseOutput> {
    const client = new Client({
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      document: input.document,
      address: input.address
    });

    await this._clientRepository.add(client);

    return {
      id: client.id.value,
      name: client.name,
      email: client.email,
      document: client.document,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    };
  }
}