import AddClientUseCase from '../usecase/AddClientUseCase';

type AddClientAdminFacadeInput = {
  id?: string;
  name: string;
  email: string;
  document: string;
  address: string;
};

export default class ClientAdminFacade {
  private _addClientUseCase: AddClientUseCase;

  constructor(addClientUseCase: AddClientUseCase) {
    this._addClientUseCase = addClientUseCase;
  }

  async add(client: AddClientAdminFacadeInput): Promise<void> {
    await this._addClientUseCase.execute(client);
  }
}