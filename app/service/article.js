'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {

  /**
   * @desc 发帖
   * @param {string} title 标题
   * @param {string} content  内容
   * @param {string} section_id 板块id
   * @return {number} 文章id
   */
  async create(title, content, section_id) {
    const app = this.app;
    const ctx = this.ctx;
    const result = await app.model.Article.create({ title, content, section_id, user_id: ctx.state.user.id, user_nickname: ctx.state.user.nickname, user_avater: ctx.state.user.avater });
    return result.id;
  }

  /**
   * @desc 编辑
   * @param {string} title 标题
   * @param {string} content  内容
   * @param {number} id  帖子ID
   * @return {array} result
   */
  async update(title, content, id) {
    const app = this.app;
    return await app.model.Article.update({ title, content }, { where: { id } });
  }

  /**
   * @desc 浏览帖子详情
   * @param {number} id  帖子ID
   * @return {object} info
   */
  async info(id) {
    const app = this.app;
    const ctx = this.ctx;
    const info = await app.model.Article.findOne({ where: { id } });
    if (!info) {
      ctx.throw('帖子不存在');
    }
    await app.model.Article.read(id);
    const { user_id, user_nickname, user_avater, title, content, like, read, comment, created_at, updated_at } = info;
    return { user_id, user_nickname, user_avater, title, content, like, read, comment, created_at, updated_at };
  }

  /**
   * @desc 浏览帖子列表
   * @param {string} page  第几页
   * @param {string} per_page  每页显示的贴子数
   * @return {array} list
   */
  async list(page, per_page) {
    console.log(page, per_page);
    const app = this.app;
    return await app.model.Article.findAndCountAll({ attributes: [ 'user_id', 'user_nickname', 'user_avater', 'id', 'title', 'content', 'like', 'read', 'comment', 'created_at', 'updated_at' ] });
  }

}

module.exports = ArticleService;
