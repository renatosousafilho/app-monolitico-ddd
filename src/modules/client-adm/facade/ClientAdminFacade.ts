import AddClientUseCase from '../usecase/AddClientUseCase';
import FindClientUseCase from '../usecase/FindClientUseCase';

type AddClientAdminFacadeInput = {
  id?: string;
  name: string;
  email: string;
  document: string;
  address: string;
};

type FindClientAdminFacadeInput = {
  id: string;
};

type FindClientAdminFacadeOutput = {
  id: string;
  name: string;
  email: string;
  document: string;
  address: string;
};

export default class ClientAdminFacade {
  private _addClientUseCase: AddClientUseCase;
  private _findClientUseCase: FindClientUseCase;

  constructor(addClientUseCase: AddClientUseCase, findClientUseCase: FindClientUseCase) {
    this._addClientUseCase = addClientUseCase;
    this._findClientUseCase = findClientUseCase;
  }

  async add(client: AddClientAdminFacadeInput): Promise<void> {
    await this._addClientUseCase.execute(client);
  }

  async find(input: FindClientAdminFacadeInput): Promise<FindClientAdminFacadeOutput> {
    return await this._findClientUseCase.execute({ id: input.id });
  }
}