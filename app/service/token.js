'use strict';

const Service = require('egg').Service;

class TokenService extends Service {

  /**
   * @desc 生成token
   * @param {object} userInfo 用户信息
   * @return {object} token
   */
  async create(userInfo) {
    return this.app.jwt.sign({
      data: userInfo,
      exp: this.app.config.jwt.defaultExp,
      iat: Math.floor(Date.now() / 1000) - 1800, // 提前3小时有效， 特别是在我们办公室电脑的时间不准确时便于测试
    }, this.app.config.jwt.secret);
  }

  /**
   * @desc 校验及解密token
   * @param {object} token token
   * @return {object} userInfo
   */
  async verify(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  }

}

module.exports = TokenService;
