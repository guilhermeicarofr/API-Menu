import { Database } from 'database/database';
import { ICategory } from 'model/ICategory';

export class CategoryRepository {
  private db;

  constructor() {
    this.db = Database.getInstance();
    this.db.connect();
  }

  async findAll(): Promise<ICategory[]> {
    const categories = await this.db.Category.find();
    return categories;
  }

  async create(category: ICategory) {
    const newCategory = new this.db.Category(category);
    return await newCategory.save();
  }

  async findById(id: string) {
    const category = await this.db.Category.findById(id);
    return category;
  }
}
