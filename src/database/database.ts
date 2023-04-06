import { ICategory } from 'model/ICategory';
import { IProduct } from 'model/IProduct';
import mongoose from 'mongoose';

export class Database {
  DATABASE_URL: string = 'mongodb://127.0.0.1:27017/menu';

  async connect() {
    await mongoose.connect(this.DATABASE_URL);
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  categorySchema = new mongoose.Schema<ICategory>({
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    name: { type: String, required: true }
  })

  productSchema = new mongoose.Schema<IProduct>({
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true }
  });

  Category = mongoose.model<ICategory>('Category', this.categorySchema);
  Product = mongoose.model<IProduct>('Product', this.productSchema);
}
