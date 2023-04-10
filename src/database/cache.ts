import { createClient } from 'redis';

import { Product } from 'model/IProduct';
import { Category } from 'model/ICategory';

export class Cache {
  private CACHE_URL = { url: process.env.CACHE_URL } || null;
  private static INSTANCE: Cache;
  private client = createClient(this.CACHE_URL);

  static getInstance() {
    if(!this.INSTANCE) this.INSTANCE = new Cache();
    return this.INSTANCE;
  }

  async connect() {
    if(!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async disconnect() {
    await this.client.disconnect();
  }

  async getProducts(): Promise<Product[]> {
    const productsCache = await this.client.get('products');
    return JSON.parse(productsCache);
  }

  async saveProducts(products: Product[]): Promise<void> {
    await this.client.set('products', JSON.stringify(products));
  }

  async flushProducts(): Promise<void> {
    await this.client.del('products');
  }

  async getCategories(): Promise<Category[]> {
    const categoriesCache = await this.client.get('categories');
    return JSON.parse(categoriesCache);
  }

  async saveCategories(categories: Category[]): Promise<void> {
    await this.client.set('categories', JSON.stringify(categories));
  }

  async flushCategories(): Promise<void> {
    await this.client.del('categories');
  }
}
