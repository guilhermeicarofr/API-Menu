import { CategoryController } from 'controller/category-controller';
import { Router } from 'express';
import { ValidationMiddleware } from 'middleware/validation-middleware';

const categoryRouter = Router();
const categoryController = new CategoryController();
const validationMiddleware = new ValidationMiddleware();

categoryRouter
  .use('/category', validationMiddleware.validateAuthToken())
    .get('/category', categoryController.getCategories());

export { categoryRouter };
