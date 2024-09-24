import { ItemModel } from '@models/item.model';

export interface Cart {
  session: string;
  items: CartItem[];
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartItemData extends ItemModel {
  id: ItemModel['id'];
  name: ItemModel['name'];
  price: ItemModel['price'];
  quantity: CartItem['quantity'];
  size?: string;
  gender?: string;
}
