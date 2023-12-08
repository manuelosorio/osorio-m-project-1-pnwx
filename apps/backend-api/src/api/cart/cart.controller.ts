import { Request, Response } from 'express';
import { CartService } from '@services/cart.service';

export class CartController {
  constructor(private cartService: CartService) {}

  getCart = (req: Request, res: Response): void => {
    this.cartService
      .get(req.session)
      .then((cart) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { session, ...cartData } = cart;
        res.send(cartData);
      })
      .catch((error) => res.status(404).send(error));
  };
  addToCart = (req: Request, res: Response): void => {
    const data = {
      session: req.session.id,
      productId: req.body.productId,
      quantity: Number(req.body.quantity),
    };
    this.cartService
      .add(data)
      .then((r) => res.send({ message: r }))
      .catch((error) => res.status(400).send(error));
  };
}
