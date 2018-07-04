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
    const info = await app.model.Article.findOne({
      where: { id },
      attributes: [ 'id', 'title', 'content', 'like', 'read', 'comment', 'user_id', 'user_nickname', 'user_avater', 'created_at', 'updated_at' ],
    });
    if (!info) {
      ctx.throw('帖子不存在');
    }
    await app.model.Article.read(id);
    return info;
  }

  /**
   * @desc 浏览板块帖子列表
   * @param {number} page  第几页
   * @param {number} per_page  每页显示的贴子数
   * @param {string} section_id  板块id
   * @param {string} type  类型：0 最新：按回帖时间排序  1 最新：按发帖时间排序 2 热门 3 精华 4 置顶
   * @return {array} list
   */
  async list(page, per_page, section_id, type) {
    const app = this.app;
    const ctx = this.ctx;
    const limit = Number(per_page);
    const offset = (Number(page) - 1) * limit;
    let order; // 最新/热门 排序
    let position;// 精华/置顶 筛选
    switch (Number(type)) {
      case 0:
        order = [
          [ 'updated_at', 'DESC' ],
        ];
        break;
      case 1:
        order = [
          [ 'created_at', 'DESC' ],
        ];
        break;
      case 2:
        order = [
          [ 'read', 'DESC' ],
          [ 'like', 'DESC' ],
          [ 'comment', 'DESC' ],
        ];
        break;
      case 3:
        position = {
          good: 1,
        };
        break;
      case 4:
        position = {
          top: 1,
        };
        break;
      default:
        ctx.throw('排序不存在');
        break;
    }
    return await app.model.Article.findAndCountAll({
      limit,
      offset,
      order,
      where: Object.assign({ section_id }, position),
      attributes: [ 'id', 'title', 'content', 'like', 'read', 'comment', 'user_id', 'user_nickname', 'user_avater', 'created_at', 'updated_at' ],
    });
  }

  /**
   * @desc 搜索帖子
   * @param {string} keyword  关键词
   * @return {object} info
   */
  async search(keyword) {
    const app = this.app;
    return await app.model.Article.findAndCountAll({
      where: {
        $or: [
          {
            title: {
              $like: `%${keyword}%`,
            },
          },
          {
            content: {
              $like: `%${keyword}%`,
            },
          },
        ] },
      attributes: [ 'id', 'title', 'content', 'like', 'read', 'comment', 'user_id', 'user_nickname', 'user_avater', 'created_at', 'updated_at' ],
    });
  }

  /**
   * @desc 删除帖子
   * @param {string} id  帖子id
   * @return {number}  0 fail 1 success
   */
  async destroy(id) {
    const app = this.app;
    const ctx = this.ctx;
    return await app.model.Article.destroy({
      where: { user_id: ctx.state.user.id, id },
    });
  }

}

module.exports = ArticleService;
