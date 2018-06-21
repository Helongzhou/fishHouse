'use strict';

const Service = require('egg').Service;

class AuthService extends Service {

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

  async verifyLogin(phone, verifyCode) {
    const ctx = this.ctx;
    if (!ctx.session.verifyCode) {
      return { msg: '请先获取验证码' };
    }
    if (phone !== ctx.session.verifyCode.phone) {
      return { msg: '请输入收到验证码的手机号' };
    }
    if (Number(verifyCode) !== ctx.session.verifyCode.code) {
      return { msg: '验证码错误' };
    }
    const minute = Math.floor((Date.now() - ctx.session.verifyCode.timestamp) / 60000);
    if (minute > 6) {
      return { msg: '验证码已超时' };
    }
    ctx.session.verifyCode = null;
    const user = await ctx.service.user.findOrCreate(phone);
    return { msg: '验证登录成功', data: user };
  }

  // async register(phone, verifyCode) {
  //   const ctx = this.ctx;
  //   if (!ctx.session.verifyCode) {
  //     return { msg: '请先获取验证码' };
  //   }
  //   if (phone !== ctx.session.verifyCode.phone) {
  //     return { msg: '请输入收到验证码的手机号' };
  //   }
  //   if (Number(verifyCode) !== ctx.session.verifyCode.code) {
  //     return { msg: '验证码错误' };
  //   }
  //   const minute = Math.floor((Date.now() - ctx.session.verifyCode.timestamp) / 60000);
  //   if (minute > 6) {
  //     return { msg: '验证码已超时' };
  //   }
  //   ctx.session.verifyCode = null;
  //   console.log('do someting...');
  //   const user = await ctx.service.user.createUser(phone);
  //   return { msg: '注册成功', data: user };
  // }
}

module.exports = AuthService;
