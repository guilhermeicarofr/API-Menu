import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { CategoryService } from 'service/category-service';

export class CategoryController {
  private service;

  constructor() {
    this.service = new CategoryService();
  }

  getCategories() {
    return async (req: Request, res: Response) => {
      try {
        const categories = await this.service.listCategories();
        return res.status(httpStatus.OK).send(categories);
      } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    };
  }
}
