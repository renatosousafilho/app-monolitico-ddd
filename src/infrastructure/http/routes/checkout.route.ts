import { Router } from 'express';
import { PlaceOrderUseCaseInput } from '../../../domains/checkout/usecase/PlaceOrderUseCase';
import PlaceOrderUseCaseFactory from '../../modules/checkout/factory/PlaceOrderUseCaseFactory';

const checkoutRoute = Router();

checkoutRoute.post('/', async (req, res) => {
  const placeOrderUseCase = PlaceOrderUseCaseFactory.create();

  const input: PlaceOrderUseCaseInput = {
    clientId: req.body.clientId,
    products: req.body.products,
  };
  
  const output = await placeOrderUseCase.execute(input);
  res.status(201).json(output);
});

export default checkoutRoute;