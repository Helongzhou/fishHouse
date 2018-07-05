'use strict';

const Service = require('egg').Service;

class CommentService extends Service {
  /**
   * @desc 回复/评论
   * @param {string} article_id 文章id
   * @param {string} content 内容
   * @param {string} to_uid 被评论用户
   * @return {object} Comment info
   */
  async create(article_id, content, to_uid) {
    const app = this.app;
    const ctx = this.ctx;
    const article = await ctx.service.article.info(article_id);
    const author = article.user_id === ctx.state.user.id ? 'true' : 'false';
    const comment = await app.model.Comment.create({
      article_id,
      content,
      user_id: ctx.state.user.id,
      user_nickname: ctx.state.user.nickname,
      user_avater: ctx.state.user.avater,
      to_uid,
      author,
    });
    await ctx.service.article.comment(article_id);
    return comment.id;
  }

  /**
   * @desc 获取文章评论列表
   * @param {string} article_id 内容
   * @param {string} page 页码
   * @param {string} per_page 每页多少条
   * @return {array} Comment list
   */
  async list(article_id, page, per_page) {
    const app = this.app;
    const limit = Number(per_page);
    const offset = (Number(page) - 1) * limit;
    return await app.model.Comment.findAll({
      limit,
      offset,
      attributes: [ 'id', 'user_avater', 'user_nickname', 'user_id', 'to_uid', 'author', 'content', 'created_at' ] });
  }

  /**
   * @desc 删除自己的评论
   * @param {string} id 评论id
   * @return {array} 1:成功 0:失败
   */
  async destroy(id) {
    const app = this.app;
    const ctx = this.ctx;
    const comment = await app.model.Comment.findOne({ where: { id } });
    if (comment.user_id !== ctx.state.user.id) {
      ctx.throw('不能删除他人的评论！');
    }
    return await app.model.Comment.destroy({ where: { id } });
  }

}

module.exports = CommentService;
