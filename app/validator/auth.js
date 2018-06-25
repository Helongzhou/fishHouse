'use strict';

module.exports = app => {
  const Joi = app.Joi;
  return {
    phone: Joi.string().length(11).required(),
    login: Joi.object().keys({
      username: Joi.string().min(6).max(50)
        .required(),
      password: Joi.string().max(26).required(),
    }),
    verifyLogin: Joi.object().keys({
      phone: Joi.string().length(11).required(),
      verifyCode: Joi.string().length(6).required(),
    }),
    register: Joi.object().keys({
      nickname: Joi.string().max(11).required(),
      // phone: Joi.when('email', { is: Joi.exist(), then: Joi.string().length(11), otherwise: Joi.string().length(11)
      //   .required() }),
      email: Joi.string().email().max(50)
        .required(),
      password: Joi.string().max(26).required(),
    }),
    registerByPhone: Joi.object().keys({
      nickname: Joi.string().max(11).required(),
      phone: Joi.string().length(11).required(),
      verifyCode: Joi.string().length(6).required(),
      password: Joi.string().max(26).required(),
    }),
    logout: Joi.string().required(),
  };
};
