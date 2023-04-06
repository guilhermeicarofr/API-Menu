import Joi from 'joi';

export class ValidationSchemas {
  authBody = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
}
