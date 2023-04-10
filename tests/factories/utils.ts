import { Cache } from 'database/cache';
import { Database } from 'database/database';
import { IAdmin } from 'model/IAdmin';
import { Category, ICategory } from 'model/ICategory';
import { IProduct, Product } from 'model/IProduct';

export class Utils {
  private db;
  private cache;

  constructor() {
    this.db = Database.getInstance();
    this.cache = Cache.getInstance();
    this.db.connect();
    this.cache.connect();
  }

  async wipeDatabase() {
    await this.cache.flushCategories();
    await this.cache.flushProducts();
    await this.db.Admin.deleteMany();
    await this.db.Category.deleteMany();
    await this.db.Product.deleteMany();
  }

  async createAdmin(data: IAdmin): Promise<IAdmin> {
    return await this.db.Admin.create(data);
  }

  async createCategory(data: ICategory): Promise<Category> {
    return (await this.db.Category.create(data)).populate('parent');
  }

  async createProduct(data: IProduct): Promise<Product> {
    return (await this.db.Product.create(data)).populate({ path: 'categories', populate: { path: 'parent' } });
  }
}
