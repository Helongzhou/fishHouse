'use strict';

const crypto = require('crypto');

module.exports = {

  /**
   * @desc MD5加密
   * @param {string} text 待加密字符串
   * @return {string} md5Decode
   */
  md5(text) {
    return crypto.createHash('md5').update(text)
      .digest('hex');
  },

  /**
   * @desc 生成任意位数的随机数
   * @param {number} length 需要随机数的位数
   * @return {number} random number
   */
  genRandom(length) {
    const random = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, length - 1));
    return random;
  },
};
