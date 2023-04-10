import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Schema } from 'joi';

import { ValidationSchemas } from 'schemas/validation-schemas';
import { AuthService } from 'service/auth-service';
import { EncryptionService } from 'service/encryption-service';

export class ValidationMiddleware {
  private auth;
  private encryption;
  schemas;

  constructor () {
    this.schemas = new ValidationSchemas();
    this.encryption = new EncryptionService();
    this.auth = new AuthService();
  }

  validateSchema(schema: Schema, type: 'body' | 'params') {
    return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req[type], { abortEarly: false });
      if(validation.error) {
        return res.status(httpStatus.BAD_REQUEST).send(validation.error.details.map((detail) => detail.message));
      }
      next();
    };
  }

  validateAuthToken() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const auth1 = req.header('Authorization');
      const auth2 = req.header('Authentication');

      let token = null;
      if(auth1) {
        token = auth1.split(' ')[1];
      } else if(auth2) {
        token = auth2;
      }
      if (!token) return res.sendStatus(httpStatus.UNAUTHORIZED);

      const verified = this.encryption.verifyToken(token);
      if(!verified) return res.sendStatus(httpStatus.UNAUTHORIZED);

      const checkUsername = await this.auth.checkUsernameInUse(verified.username);
      if(!checkUsername) return res.sendStatus(httpStatus.UNAUTHORIZED);
      return next();
    };
  }
}
