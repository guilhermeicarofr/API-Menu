import { Router } from 'express';

import { TestController } from 'controller/test-controller';

const testRouter = Router();
const testController = new TestController();

testRouter
  .get('/test', testController.test());

export { testRouter };
