import { AuthController } from 'controller/auth-controller';
import {  } from 'controller/test-controller';
import { Router } from 'express';
import { ValidationMiddleware } from 'middleware/validation-middleware';

const authRouter = Router();
const validationMiddleware = new ValidationMiddleware();
const authController = new AuthController();

authRouter
  .all('/auth', validationMiddleware.validateSchema(validationMiddleware.schemas.authBody, 'body'))
  .post('/signup', authController.postSignup)

export { authRouter };