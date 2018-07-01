'use strict';

module.exports = app => {
  const Joi = app.Joi;
  const name = Joi.string().min(1).max(26);
  const description = Joi.string().min(6).max(100);
  const forum_id = Joi.string().regex(/^[0-9]{1,30}$/);// 论坛id
  const id = Joi.string().regex(/^[0-9]{1,300}$/).required();// 板块id
  return {
    create: Joi.object().keys({
      name: name.required(),
      description: description.required(),
      forum_id: forum_id.required(),
    }),
    update: Joi.object().keys({
      name,
      description,
      forum_id,
    }),
    id,
  };
};
