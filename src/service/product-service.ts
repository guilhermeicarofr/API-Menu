import { ProductRepository } from 'repository/product-repository';

export class ProductService {
  private repository;
  
  constructor() {
    this.repository = new ProductRepository();
  }

  async listProducts() {
    let products = await this.repository.findAll();
    return products;
  }
}
