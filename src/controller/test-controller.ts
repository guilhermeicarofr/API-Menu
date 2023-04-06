import { Request, Response } from 'express';
import { TestService } from 'service/test-service';

export class TestController {
  service = new TestService();

  test(req: Request, res: Response): Response {
    if(this.service.test()) {
      console.log("Application running!");
      return res.send("Application running!");  
    }
  }
}
