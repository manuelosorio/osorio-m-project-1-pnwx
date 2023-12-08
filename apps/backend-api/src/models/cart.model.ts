export interface Cart {
  session: string;
  items: CartItem[];
}

export interface CartItem {
  productId: number;
  quantity: number;
}
