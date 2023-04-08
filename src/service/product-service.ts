import { Errors } from 'errors/errors';
import { ProductRepository } from 'repository/product-repository';

export class ProductService {
  private repository;
  private errors;
  
  constructor() {
    this.repository = new ProductRepository();
    this.errors = new Errors();
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
}
