import { Router } from 'express';

import { ProductController } from 'controller/product-controller';
import { ValidationMiddleware } from 'middleware/validation-middleware';

const productRouter = Router();
const productController = new ProductController();
const validationMiddleware = new ValidationMiddleware();

productRouter
  .use('/product', validationMiddleware.validateAuthToken())
    .get('/product', productController.getProducts())
    .post('/product', validationMiddleware.validateSchema(validationMiddleware.schemas.postProductBody, 'body'), productController.postProduct())
    .use('/product/:id', validationMiddleware.validateSchema(validationMiddleware.schemas.idParam, 'params'))  
      .get('/product/:id', productController.getOneProduct())
      .delete('/product/:id', productController.deleteOneProduct())
      .patch('/product/:id', validationMiddleware.validateSchema(validationMiddleware.schemas.patchProductBody, 'body'), productController.patchProduct());

export { productRouter };
