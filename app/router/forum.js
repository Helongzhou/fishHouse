'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 查看论坛列表
  router.get('/forum', controller.forum.list);
  // 编辑
  router.put('/admin/forum/:id', controller.forum.update);
  // 创建
  router.post('/admin/forum', controller.forum.create);
  // 删除
  router.delete('/admin/forum/:id', controller.forum.destroy);

  // 查看明细
  //   router.get('/admin/forum/:id', controller.forum.info);
  // 搜索
//   router.get('/admin/forum/:keywords/search', controller.forum.search);
  // POST - 增;
  // DELETE - 删;
  // PUT - 改;
  // GET - 查;
};
