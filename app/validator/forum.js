'use strict';

module.exports = app => {
  const Joi = app.Joi;
  const name = Joi.string().min(1).max(26);
  const description = Joi.string().min(6).max(100);
  const id = Joi.string().regex(/^[0-9]{1,30}$/).required();// 论坛id
  return {
    create: Joi.object().keys({
      name: name.required(),
      description: description.required(),
    }),
    update: Joi.object().keys({
      name,
      description,
    }),
    id,
  };
};
