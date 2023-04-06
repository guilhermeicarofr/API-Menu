import { Category } from './Category';

export class Product {
  categories: Category[];
  name: string;
  qty: number;
  price: number;

  constructor(categories: Category[], name: string, qty: number, price: number) {
    this.categories = categories;
    this.name = name;
    this.qty = qty;
    this.price = price;
  }
}
