import Id from '../../@shared/domain/value-object/id.value-object';
import Client from '../domain/Client';
import ClientGateway from '../gateway/ClientGateway';

type FindClientUseCaseInput = { 
  id: string;
};

type FindClientUseCaseOutput = {
  id: string;
  name: string;
  email: string;
  document: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
};

export default class FindClientUseCase {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: FindClientUseCaseInput): Promise<FindClientUseCaseOutput> {
    const client = await this._clientRepository.find(input.id);

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