'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 点赞
  router.post('/like/article', controller.like.article);
  router.post('/like/comment', controller.like.comment);
  // 取消点赞
  router.delete('/like/article/:id', controller.like.articleCancel);
  router.delete('/like/comment/:id', controller.like.commentCancel);


  // POST - 增;
  // DELETE - 删;
  // PUT - 改;
  // GET - 查;
};
