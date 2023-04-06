import { ICategory } from './ICategory';

export interface IProduct {
  categories: ICategory[];
  name: string;
  qty: number;
  price: number;
}
