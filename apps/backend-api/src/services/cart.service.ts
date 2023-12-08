import { Cart } from '@models/cart.model';
import { Session } from 'express-session';

export class CartService {
  constructor() {
    console.log('CartService created');
  }
  public static carts: Cart[] = [];

  get = (session: Session): Promise<Cart> => {
    return new Promise((resolve, reject) => {
      const cart =
        CartService.carts.find((cart) => cart.session === session.id) || null;
      if (cart) {
        resolve(cart);
      } else {
        reject('Cart not found');
      }
    });
  };

  add = (data: {
    session: string;
    productId: number;
    quantity: number;
  }): Promise<string> => {
    const { session, productId, quantity } = data;
    return new Promise((resolve, reject) => {
      if (!(session && productId && quantity)) {
        reject('Missing required fields');
        return;
      }

      const cart = CartService.carts.find((cart) => cart.session === session);
      if (cart) {
        const item = cart.items.find((item) => item.productId === productId);
        if (item) {
          item.quantity += quantity;
        } else {
          cart.items.push({ productId, quantity });
        }
        resolve('Added to cart');
      } else {
        CartService.carts.push({ session, items: [{ productId, quantity }] });
        resolve('Cart created');
      }
    });
  };
}
