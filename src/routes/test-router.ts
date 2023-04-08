import { TestController } from 'controller/test-controller';
import { Router } from 'express';
import { ValidationMiddleware } from 'middleware/validation-middleware';

const testRouter = Router();
const testController = new TestController();
const validationMiddleware = new ValidationMiddleware();

testRouter
  .get('/test', validationMiddleware.validateAuthToken(), testController.test());

export { testRouter };
