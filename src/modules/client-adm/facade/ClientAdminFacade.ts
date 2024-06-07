import AddClientUseCase from '../usecase/AddClientUseCase';
import FindClientUseCase from '../usecase/FindClientUseCase';
import ClientAdminFacadeInterface, { AddClientAdminFacadeInput, FindClientAdminFacadeInput, FindClientAdminFacadeOutput } from './ClientAdminFacadeInterface';

export default class ClientAdminFacade implements ClientAdminFacadeInterface {
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