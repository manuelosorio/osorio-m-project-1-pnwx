import { Request, Response } from 'express';
import { CartService } from '@services/cart.service';
import { ItemService } from '@services/item.service';
import { CartItemData } from '@models/cart.model';

export class CartController {
  constructor(
    private cartService: CartService,
    private itemService: ItemService
  ) {}

  getCart = (req: Request, res: Response): void => {
    this.cartService
      .get(req.session)
      .then(async (cart) => {
        const cartData: Promise<CartItemData | void>[] = cart.items.map(
          async (item) => {
            try {
              const data = await this.itemService.getItem(item.productId);
              const cartItem: CartItemData = {
                ...data,
                quantity: item.quantity,
              };
              return cartItem;
            } catch (error) {
              console.log(error);
            }
          }
        );
        const items = await Promise.all(cartData);
        res.send({ items });
      })
      .catch((error) => {
        if (error === 'Empty Cart') {
          return res.send({ items: [] });
        }
        return res.status(404).send({ message: error });
      });
  };
  addToCart = (req: Request, res: Response): void => {
    const data = {
      session: req.session.id,
      productId: Number(req.body.productId),
      quantity: Number(req.body.quantity),
    };
    this.cartService
      .add(data)
      .then((r) => res.send({ r }))
      .catch((error) => res.status(400).send(error));
  };
}
