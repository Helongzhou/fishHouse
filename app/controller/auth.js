'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {

  async getVerifyCode(ctx) {
    const { value } = ctx.validate(this.app.validator.auth.phone, ctx.query.phone);
    ctx.body = await ctx.service.auth.getVerifyCode(value);
  }

  async verifyLogin(ctx) {
    const { value } = ctx.validate(this.app.validator.auth.register, ctx.request.body);
    ctx.body = await ctx.service.auth.verifyLogin(value.phone, value.verifyCode);
  }

  async register(ctx) {
    const { value } = ctx.validate(this.app.validator.auth.register, ctx.request.body);
    ctx.body = await ctx.service.auth.verifyLogin(value.phone, value.verifyCode);
  }

  async login(ctx) {
    ctx.body = await ctx.service.auth.login(ctx.query.phone);
  }

  async logout(ctx) {
    ctx.body = await ctx.service.auth.logout(ctx.query.phone);
  }

}

module.exports = AuthController;
