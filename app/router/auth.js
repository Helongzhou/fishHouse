'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 获取验证码
  router.get('/auth/message', controller.auth.getVerifyCode);
  // 验证登录
  router.post('/auth/verifyLogin', controller.auth.verifyLogin);
};
