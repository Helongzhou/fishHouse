'use strict';

const Service = require('egg').Service;


class UserService extends Service {

  /**
   * @desc 创建用户
   * @param {object} params nikename , email,phone,email,password
   * @return {number} info
   */
  async create(params) {
    const app = this.app;
    const { nickname, email, phone, password } = params;
    return await app.model.User.create({ nickname, email, phone, password: this.decodePassword(password) });
  }

  /**
   * @desc 查找或创建用户
   * @param {string} phone 手机号
   * @return {object} info
   */
  async findOrCreate(phone) {
    const app = this.app;
    return await app.model.User.findOrCreate({ where: { phone } });
  }

  /**
   * @desc 设置密码
   * @param {string} password 密码
   * @return {array} result
   */
  async setPassword(password) {
    const app = this.app;
    const ctx = this.ctx;
    return await app.model.User.update({
      password: this.decodePassword(password),
    }, {
      where: { id: ctx.state.user.id },
    });
  }

  /**
   * @desc 浏览用户信息
   * @param {object} params  email / phone / id
   * @return {object} info
   */
  async info(params) {
    const app = this.app;
    const { email, phone, id } = params;
    return await app.model.User.findOne({
      where: { $or: [
        { email },
        { phone },
        { id },
      ] },
    });
  }

  /**
   * @desc 密码md5加密
   * @param {string} password  密码
   * @return {string} md5
   */
  decodePassword(password) {
    const ctx = this.ctx;
    return ctx.helper.md5(password);
  }

}

module.exports = UserService;
