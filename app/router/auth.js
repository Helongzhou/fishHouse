'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 获取短信验证码
  router.get('/auth/verify/message', controller.auth.getVerifyCode);
  // 获取图形验证码
  router.get('/auth/verify/svg', controller.auth.getSvgCode);
  // 账号登录
  router.post('/auth/login', controller.auth.login);
  // 验证登录
  router.post('/auth/login/verify', controller.auth.verifyLogin);
  // 登出
  router.post('/auth/logout', controller.auth.logout);
  // 邮箱注册
  router.post('/auth/register', controller.auth.register);
  // 手机注册
  router.post('/auth/register/phone', controller.auth.registerByPhone);
  // 设置密码
  router.put('/auth/password', controller.auth.setPassword);
};
