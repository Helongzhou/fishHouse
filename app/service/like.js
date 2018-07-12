'use strict';

const Service = require('egg').Service;

class LikeService extends Service {
  /**
   * @desc 给文章点赞
   * @param {string} article_id 文章id
   * @return {object} Like info
   */
  async article(article_id) {
    const app = this.app;
    const ctx = this.ctx;
    const exist = await app.model.Like.findOne({
      where: {
        article_id,
        user_id: ctx.state.user.id,
      },
    });
    if (exist) {
      ctx.throw('请勿重复点赞');
    }
    const like = await app.model.Like.create({
      article_id,
      user_id: ctx.state.user.id,
    });
    await ctx.service.article.like(article_id);
    return like;
  }

  /**
   * @desc 文章取消点赞
   * @param {string} article_id 文章id
   * @return {array} 1:成功 0:失败
   */
  async articleCancel(article_id) {
    const app = this.app;
    const ctx = this.ctx;
    const cancel = await app.model.Like.destroy({ where: { article_id, user_id: ctx.state.user.id } });
    await ctx.service.article.unlike(article_id);
    return cancel;
  }

  /**
   * @desc 给评论点赞
   * @param {string} comment_id 文章id
   * @return {object} Like info
   */
  async comment(comment_id) {
    const app = this.app;
    const ctx = this.ctx;
    const exist = await app.model.Like.findOne({
      where: {
        comment_id,
        user_id: ctx.state.user.id,
      },
    });
    if (exist) {
      ctx.throw('请勿重复点赞');
    }
    const like = await app.model.Like.create({
      comment_id,
      user_id: ctx.state.user.id,
    });
    await ctx.service.comment.like(comment_id);
    return like;
  }

  /**
   * @desc 评论取消点赞
   * @param {string} comment_id 文章id
   * @return {array} 1:成功 0:失败
   */
  async commentCancel(comment_id) {
    const app = this.app;
    const ctx = this.ctx;
    const cancel = await app.model.Like.destroy({ where: { comment_id, user_id: ctx.state.user.id } });
    await ctx.service.comment.unlike(comment_id);
    return cancel;
  }

  /**
   * @desc 是否已经点赞
   * @param {object} obj {comment_id} / {article_id}
   * @return {array}  0:没有点赞 else:已点赞
   */
  async exist(obj) {
    const app = this.app;
    const ctx = this.ctx;
    let result;
    try {
      const like = await app.model.Like.findOne({
        where: Object.assign({ user_id: ctx.state.user.id }, obj),
      });
      result = like.id;
    } catch (error) {
      result = 0;
    }
    return result;
  }

}

module.exports = LikeService;
