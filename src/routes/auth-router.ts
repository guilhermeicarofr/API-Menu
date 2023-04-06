import { AuthController } from 'controller/auth-controller';
import { Router } from 'express';
import { ValidationMiddleware } from 'middleware/validation-middleware';

const authRouter = Router();
const validationMiddleware = new ValidationMiddleware();
const authController = new AuthController();

authRouter
  .use('/auth/*', validationMiddleware.validateSchema(validationMiddleware.schemas.authBody, 'body'))
  .post('/auth/signup', authController.postSignup());
  
export { authRouter };
