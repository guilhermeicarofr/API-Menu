import { isValidObjectId } from 'mongoose';

import { Cache } from 'database/cache';
import { Database } from 'database/database';
import { ICategory } from 'model/ICategory';

export class CategoryRepository {
  private db;
  private cache;

  constructor() {
    this.db = Database.getInstance();
    this.cache = Cache.getInstance();
    this.db.connect();
    this.cache.connect();
  }

  async findAll(): Promise<ICategory[]> {
    let categories = await this.cache.getCategories();
    if(!categories) {
      categories = await this.db.Category.find().populate('parent');
      await this.cache.saveCategories(categories);
    }
    return categories;
  }

  async create(category: ICategory) {
    await this.cache.flushCategories();
    
    const newCategory = new this.db.Category(category);
    return (await newCategory.save());
  }

  async findById(id: string) {
    let category = null;
    if(isValidObjectId(id)) {
      category = await this.db.Category.findById({ _id: id });
    }
    return category;
  }
}
