import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { TestService } from 'service/test-service';

export class TestController {
  private service;

  constructor() {
    this.service = new TestService();
  }

  test() {
    return (req: Request, res: Response) => {
      this.service.test();
      return res.status(httpStatus.OK).send('Application running!');    
    };
  }
}
