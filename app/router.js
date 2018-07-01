'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/auth')(app);
  require('./router/article')(app);
  require('./router/forum')(app);
  require('./router/section')(app);
  // GET - 查看;
  // POST - 创建;
  // PUT - 编辑;
  // DELETE - 删除;
};
