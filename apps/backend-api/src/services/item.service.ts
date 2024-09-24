import { ItemDataMock } from '../mock/item-data.mock';
import { ItemModel } from '@models/item.model';

export class ItemService {
  private readonly items: ItemModel[];
  constructor() {
    this.items = ItemDataMock;
  }

  public getItems = (): Promise<ItemModel[]> => {
    return new Promise((resolve, _reject) => {
      resolve(this.items);
    });
  };
  public getItem = (id: number): Promise<ItemModel> => {
    return new Promise((resolve, reject) => {
      const item = this.items.find((item) => item.id === id);
      if (item) {
        resolve(item);
      } else {
        reject('Item not found');
      }
    });
  };
}
