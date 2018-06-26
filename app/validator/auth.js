'use strict';

module.exports = app => {
  const Joi = app.Joi;
  const username = Joi.string().min(1).max(50)
    .required(); // 账号：邮箱及手机号码
  const password = Joi.string().min(6).max(26)
    .required();
  const phone = Joi.string().length(11).required();
  const verifyCode = Joi.string().length(6).required(); // 验证码
  const nickname = Joi.string().max(11).required();
  const email = Joi.string().email().max(50)
    .required();
  return {
    phone,
    login: Joi.object().keys({
      username,
      password,
    }),
    verifyLogin: Joi.object().keys({
      phone,
      verifyCode,
    }),
    register: Joi.object().keys({
      nickname,
      email,
      password,
    }),
    registerByPhone: Joi.object().keys({
      nickname,
      phone,
      verifyCode,
      password,
    }),
    password,
  };
};
