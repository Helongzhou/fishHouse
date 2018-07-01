'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 查看全部板块列表
  router.get('/section', controller.section.list);
  // 编辑
  router.put('/admin/section/:id', controller.section.update);
  // 创建
  router.post('/admin/section', controller.section.create);
  // 删除
  router.delete('/admin/section/:id', controller.section.destroy);

  // 查看明细
  //   router.get('/admin/section/:id', controller.section.info);
  // 搜索
  //   router.get('/admin/section/:keywords/search', controller.section.search);
  // POST - 增;
  // DELETE - 删;
  // PUT - 改;
  // GET - 查;
};
