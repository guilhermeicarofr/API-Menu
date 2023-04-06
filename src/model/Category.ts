export class Category {
  parent: Category | null;
  name: string;

  constructor(parent: Category | null, name: string) {
    this.parent = parent;
    this.name = name;
  }
}
