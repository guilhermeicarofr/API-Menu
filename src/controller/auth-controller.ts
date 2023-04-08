import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IAdmin } from 'model/IAdmin';
import { AuthService } from 'service/auth-service';

export class AuthController {
  private service;

  constructor() {
    this.service = new AuthService();
  }

  postSignup() {
    return async (req: Request, res: Response) => {
      const { username, password } = req.body as IAdmin;

      try {
        await this.service.createNewAdmin(username, password);
        return res.sendStatus(httpStatus.CREATED);
      } catch (error) {
        if(error.name === 'InvalidSignUp') return res.status(httpStatus.CONFLICT).send(error.message);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    };
  }

  postLogin() {
    return async (req: Request, res: Response) => {
      const { username, password } = req.body as IAdmin;

      try {
        const token = await this.service.returnAdminAuthToken(username, password);
        return res.status(httpStatus.OK).send(token);
      } catch (error) {
        if(error.name === 'UserNotFound') return res.status(httpStatus.FORBIDDEN).send(error.message);
        if(error.name === 'InvalidLogin') return res.status(httpStatus.FORBIDDEN).send(error.message);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    };
  }
}
