import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IProduct } from 'model/IProduct';
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

  deleteOneProduct() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      try {
        await this.service.deleteProduct(id);
        return res.sendStatus(httpStatus.OK);
      } catch (error) {
        if(error.name === 'NotFound') return res.status(httpStatus.NOT_FOUND).send(error.message);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    };
  }

  postProduct() {
    return async (req: Request, res: Response) => {
      const { name, categories, price, qty } = req.body as IProduct;

      try {
        const newProduct = await this.service.createNewProduct({ name, categories, price, qty });
        return res.status(httpStatus.CREATED).send(newProduct);
      } catch (error) {
        if(error.name === 'CategoryConflict') return res.status(httpStatus.CONFLICT).send(error.message);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    };
  }

  patchProduct() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const productPatch = req.body as IProduct;

      try {
        const editedProduct = await this.service.editProduct(id, productPatch);
        return res.status(httpStatus.OK).send(editedProduct);
      } catch (error) {
        if(error.name === 'NotFound') return res.status(httpStatus.NOT_FOUND).send(error.message);
        if(error.name === 'CategoryConflict') return res.status(httpStatus.CONFLICT).send(error.message);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    };
  }
}
