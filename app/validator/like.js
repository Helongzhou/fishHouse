'use strict';

module.exports = app => {
  const Joi = app.Joi;
  const id = Joi.string().regex(/^\+?[1-9][0-9]*$/, 'numbers')
    .required(); // 文章id 评论id
  return {
    article: Joi.object().keys({
      article_id: id,
    }),
    comment: Joi.object().keys({
      comment_id: id,
    }),
    id,
  };
};
