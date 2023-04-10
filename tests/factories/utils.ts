import { Cache } from 'database/cache';
import { Database } from 'database/database';
import { IAdmin } from 'model/IAdmin';

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

  async createAdmin(data: IAdmin) {
    return await this.db.Admin.create(data);
  }
}
