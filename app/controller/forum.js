'use strict';

const Controller = require('egg').Controller;

class ForumController extends Controller {

  async create(ctx) {
    const { value: { name, description } } = ctx.validate(this.app.validator.forum.create, ctx.request.body);
    ctx.body = await ctx.service.forum.create(name, description);
  }

  async list(ctx) {
    ctx.body = await ctx.service.forum.list();
  }

  async update(ctx) {
    const { value: { name, description } } = ctx.validate(this.app.validator.forum.update, ctx.request.body);
    const { value: id } = ctx.validate(this.app.validator.forum.id, ctx.params.id);
    ctx.body = await ctx.service.forum.update(id, name, description);
  }

  async destroy(ctx) {
    const { value: id } = ctx.validate(this.app.validator.forum.id, ctx.params.id);
    ctx.body = await ctx.service.forum.destroy(id);
  }

}

module.exports = ForumController;
