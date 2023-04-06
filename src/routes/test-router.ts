import { TestController } from 'controller/test-controller';
import { Router } from 'express';

const testRouter = Router();
const testController = new TestController();

testRouter.get("/test", (req, res) => {
  testController.test(req, res);
});

export { testRouter };