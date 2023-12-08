export interface ItemModel {
  id: number;
  name: string;
  company: string;
  price: number;
  description: string;
  image: string;
  featured?: boolean | false;
}
