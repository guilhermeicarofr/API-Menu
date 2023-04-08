import { Database } from 'database/database';
import { IProduct } from 'model/IProduct';
import { isValidObjectId } from 'mongoose';

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

  async create(product: IProduct) {
    const newProduct = new this.db.Product(product);
    return await newProduct.save();
  }

  async findById(id: string) {
    let product = null;
    if(isValidObjectId(id)) {
      product = await this.db.Product.findById({ _id: id })
    }
    return product;
  }
}
