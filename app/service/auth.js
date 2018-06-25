'use strict';

const Service = require('egg').Service;

class AuthService extends Service {

  /**
   * @desc 获取验证码
   * @param {string} phone 有效手机号
   * @return {object} 验证码
   */
  async getVerifyCode(phone) {
    const ctx = this.ctx;
    const genRandom = (floor, ceil) => parseInt(Math.random() * (ceil - floor + 1) + floor);
    const code = genRandom(111111, 999999);
    // const result = await ctx.curl(`http://v.juhe.cn/sms/send?mobile=${phone}&tpl_id=82936&tpl_value=%23code%23%3D${code}&key=0af922b4781528a32a90156e1f07bcb7`, {
    //   method: 'GET',
    //   dataType: 'json',
    // });
    // if (result.status === 200) {
    const timestamp = Date.now();
    ctx.session.verifyCode = { timestamp, code, phone };
    // }
    // return result.data.reason;
    return { verifyCode: code };
  }

  /**
   * @desc 验证登录
   * @param {string} phone 有效手机号
   * @param {string} verifyCode 有效验证码
   * @return {object} token
   */
  async verifyLogin(phone, verifyCode) {
    const ctx = this.ctx;
    const app = this.app;
    this.verifyCode(phone, verifyCode);
    const user = await app.model.User.findOrCreate({ where: { phone } });
    const token = ctx.service.token.create(user);
    return { message: '验证登录成功', token };
  }

  /**
   * @desc 邮箱注册
   * @param {string} nickname 昵称
   * @param {string} email  邮箱
   * @param {string} password  密码
   * @return {object} msg
   */
  async register(nickname, email, password) {
    const app = this.app;
    const ctx = this.ctx;
    const user = await this.app.model.User.findOne({
      where: { email },
    });
    if (user) {
      ctx.throw('此邮箱已被注册');
    }
    await app.model.User.create({ nickname, email, password: require('crypto').createHash('md5').update(password)
      .digest('hex') });
    return { message: '注册成功' };
  }

  /**
   * @desc 手机号注册
   * @param {string} nickname 昵称
   * @param {string} phone  手机号
   * @param {string} verifyCode 有效验证码
   * @param {string} password  密码
   * @return {object} msg
   */
  async registerByPhone(nickname, phone, verifyCode, password) {
    const app = this.app;
    const ctx = this.ctx;
    this.verifyCode(phone, verifyCode);
    const user = await this.app.model.User.findOne({
      where: { phone },
    });
    if (user) {
      ctx.throw('此手机号码已被注册');
    }
    await app.model.User.create({ nickname, phone, password: require('crypto').createHash('md5').update(password)
      .digest('hex') });
    return { message: '注册成功' };
  }

  /**
   * @desc 账号密码登录
   * @param {string} usename  邮箱或者手机号
   * @param {string} password  密码
   * @return {object} msg
   */
  async login(usename, password) {
    const ctx = this.ctx;
    const user = await this.app.model.User.findOne({
      where: { $or: [
        { email: usename },
        { phone: usename },
      ] },
    });
    if (!user) {
      ctx.throw('用户不存在');
    }
    if (require('crypto').createHash('md5').update(password)
      .digest('hex') !== user.password) {
      ctx.throw('密码不正确');
    }
    const token = ctx.service.token.create(user);
    return { message: '登录成功', token };
  }

  /**
   * @desc 登出
   * @param {string} token  token
   * @return {object} msg
   */
  async logout(token) {
    const ctx = this.ctx;
    const jwt = token.split(' ')[1];
    await ctx.service.token.invalid(jwt);
    return { message: '登出成功' };
  }

  /**
   * @desc 验证码校验
   * @param {string} phone  手机号
   * @param {string} verifyCode  密码
   */
  verifyCode(phone, verifyCode) {
    const ctx = this.ctx;
    if (!ctx.session.verifyCode) {
      ctx.throw('请先获取验证码');
    }
    if (phone !== ctx.session.verifyCode.phone) {
      ctx.throw('请输入收到验证码的手机号');
    }
    if (Number(verifyCode) !== ctx.session.verifyCode.code) {
      ctx.throw('验证码错误');
    }
    const minute = Math.floor((Date.now() - ctx.session.verifyCode.timestamp) / 60000);
    if (minute > 6) {
      ctx.throw('验证码已超时');
    }
    ctx.session.verifyCode = null;
  }
}

module.exports = AuthService;
