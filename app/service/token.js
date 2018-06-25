'use strict';

const Service = require('egg').Service;

class TokenService extends Service {

  /**
   * @desc 生成token
   * @param {object} userInfo 用户信息
   * @return {object} token
   */
  create(userInfo) {
    const app = this.app;
    const { id, nickname, phone, email } = userInfo;
    const token = app.jwt.sign({
      data: { id, nickname, phone, email },
      exp: app.config.jwt.defaultExp, // 默认配置一天失效
      iat: Math.floor(Date.now() / 1000) - 1800, // 提前3小时有效， 特别是在我们办公室电脑的时间不准确时便于测试
    }, app.config.jwt.secret);
    return token;
  }

  /**
   * @desc 校验及解密token
   * @param {string} token token
   * @return {object} userInfo
   */
  verify(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  }

  /**
   * @desc 将token加入redis黑名单 http://redisdoc.com/set/sadd.html
   * @param {string} token token
   * @return {object} msg
   */
  async invalid(token) {
    return await this.app.redis.sadd('TOKEN_BLACKLIST', token);
  }

  /**
   * @desc 判断token是否存在redis黑名单内 http://redisdoc.com/set/sismember.html
   * @param {string} token token
   * @return {object} msg
   */
  async isInvalid(token) {
    return await this.app.redis.sismember('TOKEN_BLACKLIST', token);
  }

  /**
   * @desc 删除redis黑名单内过期元素 http://redisdoc.com/set/srem.html
   * @param {string} token token
   * @return {object} msg
   */
  async removeInvalidToken(token) {
    return await this.app.redis.srem('TOKEN_BLACKLIST', token);
  }

}

module.exports = TokenService;
