export interface ICategory {
  parent: ICategory | null;
  name: string;
}

export interface Category {
  _id: string;
  parent: Category | null;
  name: string;
}
