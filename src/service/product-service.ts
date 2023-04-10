import { Errors } from 'errors/errors';
import { IProduct } from 'model/IProduct';
import { ProductRepository } from 'repository/product-repository';
import { CategoryService } from './category-service';

export class ProductService {
  private repository;
  private errors;
  private categoryService;
  
  constructor() {
    this.repository = new ProductRepository();
    this.errors = new Errors();
    this.categoryService = new CategoryService();
  }

  async listProducts() {
    let products = await this.repository.findAll();
    return products;
  }

  async listOneProduct(id: string) {
    const product = await this.repository.findById(id);
    if(!product) throw this.errors.notFound();
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.repository.findById(id);
    if(!product) throw this.errors.notFound();
    await this.repository.delete(id);
  }

  async createNewProduct({ name, categories, price, qty }: IProduct) {
    const checkCategories = await this.categoryService.checkCategories(categories);
    if(!checkCategories) throw this.errors.categoryConflict();

    const newProduct = await this.repository.create({ name, categories, price, qty });
    return newProduct;
  }

  async editProduct(id: string, productPatch: IProduct) {
    const { name, price, qty, categories } = await this.listOneProduct(id);

    let newData = { name, price, qty, categories };
    if(productPatch?.categories) {
      await this.categoryService.checkCategories(productPatch.categories);
      newData.categories = productPatch.categories;
    }
    if(productPatch?.name) newData.name = productPatch.name;
    if(productPatch?.price) newData.price = productPatch.price;
    if(productPatch?.qty) newData.qty = productPatch.qty;

    await this.repository.patch(id, newData);

    const updatedProduct = await this.listOneProduct(id);
    return updatedProduct;
  }
}
