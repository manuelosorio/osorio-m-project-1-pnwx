import { Router } from 'express';
import { CartController } from './cart.controller';
import { CartService } from '@services/cart.service';
import { ItemService } from '@services/item.service';

const cart = new CartController(new CartService(), new ItemService());

export const cartRouter = Router();

cartRouter.get('/', cart.getCart);
cartRouter.post('/', cart.addToCart);
