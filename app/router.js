'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/auth')(app);
  // const { router, controller } = app;
  // router.get('/auth/message', controller.auth.login.index);
};
