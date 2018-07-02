'use strict';

const Service = require('egg').Service;

class ForumService extends Service {
  /**
   * @desc 创建论坛
   * @param {string} name 论坛名字
   * @param {string} description 描述
   * @return {object} forum info
   */
  async create(name, description) {
    const app = this.app;
    return await app.model.Forum.create({ name, description });
  }

  /**
   * @desc 获取论坛列表
   * @return {object} forum list
   */
  async list() {
    const app = this.app;
    return await app.model.Forum.findAll({ attributes: [ 'id', 'name', 'description' ], include: [{
      model: this.app.model.Section,
      as: 'sections',
      attributes: [ 'id', 'name', 'description' ],
    }] });
  }

  /**
   * @desc 创建论坛
   * @param {number} id 论坛id
   * @param {string} name 论坛名字
   * @param {string} description 描述
   * @return {array} 1:成功 0:失败
   */
  async update(id, name, description) {
    const app = this.app;
    return await app.model.Forum.update({ name, description }, { where: { id } });
  }

  /**
   * @desc 删除论坛
   * @param {number} id 论坛id
   * @return {array} 1:成功 0:失败
   */
  async destroy(id) {
    const app = this.app;
    return await app.model.Forum.destroy({ where: { id } });
  }

}

module.exports = ForumService;
