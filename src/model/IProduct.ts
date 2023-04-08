import { Category } from './ICategory';

export interface IProduct {
  categories: Category[];
  name: string;
  qty: number;
  price: number;
}

export interface Product {
  _id: string;
  categories: Category[];
  name: string;
  qty: number;
  price: number;
}
