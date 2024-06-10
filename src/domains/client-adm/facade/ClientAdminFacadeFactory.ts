import ClientRepository from '../repository/ClientRepository';
import AddClientUseCase from '../usecase/AddClientUseCase';
import FindClientUseCase from '../usecase/FindClientUseCase';
import ClientAdminFacade from './ClientAdminFacade';

export default class ClientAdminFacadeFactory {
  static create() {
    const clientRepository = new ClientRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const findClientUseCase = new FindClientUseCase(clientRepository);
    return new ClientAdminFacade(addClientUseCase, findClientUseCase);
  }
}