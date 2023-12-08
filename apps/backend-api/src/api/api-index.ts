import { Router } from 'express';
import { cartRouter } from './cart/cart.route';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

apiRouter.use('/cart', cartRouter);

export { apiRouter };
