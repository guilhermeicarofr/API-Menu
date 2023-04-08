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

  getOneProduct() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      try {
        const product = await this.service.listOneProduct(id);
        return res.status(httpStatus.OK).send(product);
      } catch (error) {
        if(error.name === 'NotFound') return res.status(httpStatus.NOT_FOUND).send(error.message);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    };
  }
}
