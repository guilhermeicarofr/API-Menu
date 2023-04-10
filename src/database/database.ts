import { IAdmin } from 'model/IAdmin';
import { ICategory } from 'model/ICategory';
import { IProduct } from 'model/IProduct';
import mongoose from 'mongoose';

export class Database {
  private DATABASE_URL: string = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/menu';
  private static INSTANCE: Database;

  static getInstance() {
    if(!this.INSTANCE) this.INSTANCE = new Database();
    return this.INSTANCE;
  }

  async connect() {
    await mongoose.connect(this.DATABASE_URL);
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  private adminSchema = new mongoose.Schema<IAdmin>({
    username: { type: String, required: true },
    password: { type: String, required: true }
  });

  private categorySchema = new mongoose.Schema<ICategory>({
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    name: { type: String, required: true }
  });

  private productSchema = new mongoose.Schema<IProduct>({
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true }
  });

  Admin = mongoose.model<IAdmin>('Admin', this.adminSchema);
  Category = mongoose.model<ICategory>('Category', this.categorySchema);
  Product = mongoose.model<IProduct>('Product', this.productSchema);
}
