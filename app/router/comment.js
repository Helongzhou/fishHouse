'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 查看评论列表
  router.get('/comment', controller.comment.list);
  // 发表评论
  router.post('/comment', controller.comment.create);
  // 删评论
  router.delete('/comment/:id', controller.comment.destroy);

  // POST - 增;
  // DELETE - 删;
  // PUT - 改;
  // GET - 查;
};
