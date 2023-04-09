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

    await this.repository.create({ name, categories, price, qty });
  }
}
