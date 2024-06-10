import { Router } from 'express';
import InvoiceRepository from '../../modules/invoice/repository/InvoiceRepository';
import FindAllProductsUseCase from '../../../domains/store-catalog/usecase/FindAllProductsUseCase';
import FindInvoiceUseCase from '../../../domains/invoice/usecase/FindInvoiceUseCase';

const invoiceRoute = Router();

invoiceRoute.get('/:id', async (req, res) => {
  const invoiceRepository = new InvoiceRepository();
  const usecase = new FindInvoiceUseCase(invoiceRepository);
  const input = { id: req.params.id };
  const output = await usecase.execute(input);
  res.status(200).json(output);
});

export default invoiceRoute;