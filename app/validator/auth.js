'use strict';

module.exports = app => {
  const Joi = app.Joi;
  return {
    phone: Joi.string().length(11).required(),
    register: Joi.object().keys({
      phone: Joi.string().length(11).required(),
      verifyCode: Joi.string().length(6).required(),
    }),
  };
};
