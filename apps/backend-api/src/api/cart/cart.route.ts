import { Router } from 'express';
import { CartController } from './cart.controller';
import { CartService } from '@services/cart.service';

const cart = new CartController(new CartService());

export const cartRouter = Router();

cartRouter.get('/', cart.getCart);
cartRouter.post('/', cart.addToCart);
