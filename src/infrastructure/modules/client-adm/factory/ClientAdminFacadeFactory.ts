import ClientRepository from '../repository/ClientRepository';
import AddClientUseCase from '../../../../domains/client-adm/usecase/AddClientUseCase';
import FindClientUseCase from '../../../../domains/client-adm/usecase/FindClientUseCase';
import ClientAdminFacade from '../../../../domains/client-adm/facade/ClientAdminFacade';

export default class ClientAdminFacadeFactory {
  static create() {
    const clientRepository = new ClientRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const findClientUseCase = new FindClientUseCase(clientRepository);
    return new ClientAdminFacade(addClientUseCase, findClientUseCase);
  }
}