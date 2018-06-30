'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {

  async getVerifyCode(ctx) {
    const { value } = ctx.validate(this.app.validator.auth.phone, ctx.query.phone);
    ctx.body = await ctx.service.auth.getVerifyCode(value);
  }

  async getSvgCode(ctx) {
    ctx.body = await ctx.service.auth.getSvgCode();
  }

  async verifyLogin(ctx) {
    const { value } = ctx.validate(this.app.validator.auth.verifyLogin, ctx.request.body);
    const { phone, verifyCode, role } = value;
    ctx.body = await ctx.service.auth.verifyLogin(phone, verifyCode, role);
  }

  async register(ctx) {
    const { value } = ctx.validate(this.app.validator.auth.register, ctx.request.body);
    const { nickname, email, password, role } = value;
    ctx.body = await ctx.service.auth.register(nickname, email, password, role);
  }

  async registerByPhone(ctx) {
    const { value } = ctx.validate(this.app.validator.auth.registerByPhone, ctx.request.body);
    const { nickname, phone, verifyCode, password, role } = value;
    ctx.body = await ctx.service.auth.registerByPhone(nickname, phone, verifyCode, password, role);
  }

  async login(ctx) {
    const { value } = ctx.validate(this.app.validator.auth.login, ctx.request.body);
    ctx.body = await ctx.service.auth.login(value.username, value.password);
  }

  async logout(ctx) {
    ctx.body = await ctx.service.auth.logout(ctx.header.authorization);
  }

  async setPassword(ctx) {
    const { value } = ctx.validate(this.app.validator.auth.password, ctx.request.body.password);
    ctx.body = await ctx.service.auth.setPassword(ctx.header.authorization, value);
  }
}

module.exports = AuthController;
