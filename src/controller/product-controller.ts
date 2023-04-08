import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ProductService } from 'service/product-service';

export class ProductController {
  private service;

  constructor() {
    this.service = new ProductService();
  }

  getProducts() {
    return async (req: Request, res: Response) => {
      try {
        const products = await this.service.listProducts();
        return res.status(httpStatus.OK).send(products);
      } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    };
  }
}
