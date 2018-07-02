'use strict';

module.exports = app => {
  const Joi = app.Joi;
  const title = Joi.string().min(6).max(30)
    .required();
  const content = Joi.string().min(10).max(1000)
    .required();
  const section_id = Joi.string().regex(/^[0-9]{1,30}$/).required();// 板块id
  const id = Joi.string().regex(/^[0-9]/).required();// 文章id
  return {
    create: Joi.object().keys({
      title,
      content,
      section_id,
    }),
    update: Joi.object().keys({
      title,
      content,
    }),
    id,
  };
};
