'use strict';

const Controller = require('egg').Controller;

class SectionController extends Controller {

  async create(ctx) {
    const { value: { name, description, forum_id } } = ctx.validate(this.app.validator.section.create, ctx.request.body);
    ctx.body = await ctx.service.section.create(name, description, forum_id);
  }

  async list(ctx) {
    ctx.body = await ctx.service.section.list();
  }

  async update(ctx) {
    const { value: { name, description, forum_id } } = ctx.validate(this.app.validator.section.update, ctx.request.body);
    const { value: id } = ctx.validate(this.app.validator.section.id, ctx.params.id);
    ctx.body = await ctx.service.section.update(id, name, description, forum_id);
  }

  async destroy(ctx) {
    const { value: id } = ctx.validate(this.app.validator.section.id, ctx.params.id);
    ctx.body = await ctx.service.section.destroy(id);
  }

}

module.exports = SectionController;
