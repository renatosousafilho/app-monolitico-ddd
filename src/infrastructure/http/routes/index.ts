import express from 'express';
import productRouter from './product.route';
import clientRoute from './client.route';
import checkoutRoute from './checkout.route';
import invoiceRoute from './invoice.route';

const router = express.Router();

router.use('/products', productRouter);
router.use('/clients', clientRoute);
router.use('/checkout', checkoutRoute);
router.use('/invoices', invoiceRoute);

export default router;

