'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 查看帖子列表
  router.get('/article', controller.article.list);
  // 查看
  router.get('/article/:id', controller.article.info);
  // 搜索
  router.get('/article/:keyword/search', controller.article.search);
  // 编辑
  router.put('/article/:id', controller.article.update);
  // 发帖
  router.post('/article', controller.article.create);
  // 删帖
  router.delete('/article/:id', controller.article.destroy);
  // 点赞/取消点赞
  // router.put('/article/like/:id', controller.article.like);

  // POST - 增;
  // DELETE - 删;
  // PUT - 改;
  // GET - 查;
};
