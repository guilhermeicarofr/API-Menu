import Joi from 'joi';

export class ValidationSchemas {
  authBody = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  postProductBody = Joi.object({
    name: Joi.string().required(),
    qty: Joi.number().integer().min(1).required(),
    price: Joi.number().integer().min(1).required(),
    categories: Joi.array().ordered(
      Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        parent: Joi.object().allow(null),
        __v: Joi.allow(Joi.any)
      })
    )
  });

  patchProductBody = Joi.object({
    name: Joi.string(),
    qty: Joi.number().integer().min(1),
    price: Joi.number().integer().min(1),
    categories: Joi.array().ordered(
      Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        parent: Joi.object().allow(null),
        __v: Joi.allow(Joi.any)
      })
    )
  });

  idParam = Joi.object({
    id: Joi.string().required()
  });
}
