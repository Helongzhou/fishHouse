'use strict';

module.exports = app => {
  const Joi = app.Joi;
  const page = Joi.string().regex(/^\+?[1-9][0-9]*$/, 'numbers').required()
    .required(); // 页码
  const per_page = Joi.string().regex(/^\+?[1-9][0-9]*$/, 'numbers').required()
    .required();// 分页大小
  const content = Joi.string().min(2).max(100)
    .required();
  const article_id = Joi.string().regex(/^\+?[1-9][0-9]*$/, 'numbers')
    .required(); // 文章id
  const to_uid = Joi.string().regex(/^\+?[1-9][0-9]*$/, 'numbers'); // 被评论用户id
  const id = Joi.string().regex(/^\+?[1-9][0-9]*$/, 'numbers')
    .required(); // 评论id
  return {
    create: Joi.object().keys({
      article_id,
      content,
      to_uid,
    }),
    list: Joi.object().keys({
      page,
      per_page,
      article_id,
    }),
    id,
  };
};
