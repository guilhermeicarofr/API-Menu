import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Schema } from 'joi';
import { ValidationSchemas } from 'schemas/validation-schemas';

export class ValidationMiddleware {
  schemas;

  constructor () {
    this.schemas = new ValidationSchemas(); 
  }

  validateSchema(schema: Schema, type: 'body' | 'param') {
    return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req[type], { abortEarly: false });
      if(validation.error) {
        return res.status(httpStatus.BAD_REQUEST).send(validation.error.details.map((detail) => detail.message));
      }
      next();
    };
  }
}
