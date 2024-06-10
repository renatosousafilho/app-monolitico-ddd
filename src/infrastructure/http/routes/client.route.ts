import { Router } from 'express';

import ClientRepository from '../../modules/client-adm/repository/ClientRepository';
import AddClientUseCase, { AddClientUseCaseInput } from '../../../domains/client-adm/usecase/AddClientUseCase';

const clientRoute = Router();

clientRoute.post('/', async (req, res) => {
  const clientRepository = new ClientRepository();
  const addClientUseCase = new AddClientUseCase(clientRepository);
  const input: AddClientUseCaseInput = {
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
    address: req.body.address,
  }
  const output = await addClientUseCase.execute(input);
  res.status(201).json(output);
});

export default clientRoute;