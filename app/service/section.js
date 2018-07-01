'use strict';

const Service = require('egg').Service;

class SectionService extends Service {
  /**
   * @desc 创建板块
   * @param {string} name 板块名字
   * @param {string} description 描述
   * @param {number} forum_id 所属论坛id
   * @return {object} Section info
   */
  async create(name, description, forum_id) {
    const app = this.app;
    return await app.model.Section.create({ name, description, forum_id });
  }

  /**
   * @desc 获取板块列表
   * @return {object} Section list
   */
  async list() {
    const app = this.app;
    return await app.model.Section.findAll({ attributes: [ 'id', 'name', 'description' ] });
  }

  /**
   * @desc 编辑板块
   * @param {number} id 板块id
   * @param {string} name 板块名字
   * @param {string} description 描述
   * @param {number} forum_id 所属论坛id
   * @return {array} 1:成功 0:失败
   */
  async update(id, name, description, forum_id) {
    const app = this.app;
    return await app.model.Section.update({ name, description, forum_id }, { where: { id } });
  }

  /**
   * @desc 删除板块
   * @param {number} id 板块id
   * @return {array} 1:成功 0:失败
   */
  async destroy(id) {
    const app = this.app;
    return await app.model.Section.destroy({ where: { id } });
  }

}

module.exports = SectionService;
