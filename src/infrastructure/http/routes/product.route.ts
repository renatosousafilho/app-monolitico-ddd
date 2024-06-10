import { Router } from 'express';
import ProductRepository from '../../modules/product-adm/repository/ProductRepository';
import AddProductUseCase, { AddProductInput } from '../../../domains/product-adm/usecase/AddProductUseCase';

const productRouter = Router();

productRouter.post('/', async (req, res) => {
  const productRepository = new ProductRepository();
  const usecase = new AddProductUseCase(productRepository);
  const input: AddProductInput = {
    name: req.body.name,
    description: req.body.description,
    purchasePrice: req.body.purchasePrice,
    stock: req.body.stock,
  };
  const output = await usecase.execute(input);
  res.status(201).json(output);
});

export default productRouter;