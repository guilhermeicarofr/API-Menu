import { Router } from 'express';

import { ProductController } from 'controller/product-controller';
import { ValidationMiddleware } from 'middleware/validation-middleware';

const productRouter = Router();
const productController = new ProductController();
const validationMiddleware = new ValidationMiddleware();

productRouter
  .use('/product', validationMiddleware.validateAuthToken())
  .get('/product', productController.getProducts());

export { productRouter };
