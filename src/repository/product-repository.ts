import { isValidObjectId } from 'mongoose';

import { Cache } from 'database/cache';
import { Database } from 'database/database';
import { IProduct } from 'model/IProduct';

export class ProductRepository {
  private db;
  private cache;

  constructor() {
    this.db = Database.getInstance();
    this.cache = Cache.getInstance();
    this.db.connect();
    this.cache.connect();
  }

  async findAll(): Promise<IProduct[]> {
    let products = await this.cache.getProducts();
    if(!products) {
      products = await this.db.Product.find().populate({ path: 'categories', populate: { path: 'parent' } });
      await this.cache.saveProducts(products);
    }
    return products;
  }

  async create(product: IProduct) {
    await this.cache.flushProducts();

    const newProduct = new this.db.Product(product);
    return (await newProduct.save()).populate({ path: 'categories', populate: { path: 'parent' } });
  }

  async findById(id: string) {
    let product = null;
    if(isValidObjectId(id)) {
      product = await this.db.Product.findById({ _id: id }).populate({ path: 'categories', populate: { path: 'parent' } });
    }
    return product;
  }

  async delete(id: string) {
    await this.cache.flushProducts();
    await this.db.Product.findByIdAndDelete({ _id: id });
  }

  async patch(id: string, newData: IProduct) {
    await this.cache.flushProducts();
    await this.db.Product.findByIdAndUpdate({ _id: id }, newData);
  }
}
