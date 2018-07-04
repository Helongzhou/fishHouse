'use strict';

module.exports = app => {
  const Joi = app.Joi;
  const title = Joi.string().min(6).max(30)
    .required();
  const content = Joi.string().min(10).max(1000)
    .required();
  const section_id = Joi.string().regex(/^\+?[1-9][0-9]*$/, 'numbers').required()
    .required(); // 板块id
  const id = Joi.string().regex(/^\+?[1-9][0-9]*$/, 'numbers').required()
    .required(); // 文章id
  const page = Joi.string().regex(/^\+?[1-9][0-9]*$/, 'numbers').required()
    .required(); // 页码
  const per_page = Joi.string().regex(/^\+?[1-9][0-9]*$/, 'numbers').required()
    .required();// 分页大小
  const type = Joi.string().regex(/^\+?[0-9]$/, 'numbers').required()
    .required();// 类型：0 最新 1 热门 2 精华 3 置顶
  const keyword = Joi.string().min(2).max(30)
    .required();
  return {
    create: Joi.object().keys({
      title,
      content,
      section_id,
    }),
    update: Joi.object().keys({
      title,
      content,
    }),
    id,
    list: Joi.object().keys({
      page,
      per_page,
      section_id,
      type,
    }),
    keyword,
  };
};
