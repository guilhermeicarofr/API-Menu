import { Database } from 'database/database';
import { IProduct } from 'model/IProduct';

export class ProductRepository {
  private db;

  constructor() {
    this.db = Database.getInstance();
    this.db.connect();
  }

  async findAll(): Promise<IProduct[]> {
    const products = await this.db.Product.find();
    return products;
  }
}
