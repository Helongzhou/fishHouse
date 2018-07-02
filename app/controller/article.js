'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {

  async create(ctx) {
    const { value: { title, content, section_id } } = ctx.validate(this.app.validator.article.create, ctx.request.body);
    ctx.body = await ctx.service.article.create(title, content, section_id);
  }

  async update(ctx) {
    const { value: { title, content } } = ctx.validate(this.app.validator.article.update, ctx.request.body);
    const { value: id } = ctx.validate(this.app.validator.article.id, ctx.params.id);
    ctx.body = await ctx.service.article.update(title, content, id);
  }

  async info(ctx) {
    const { value: id } = ctx.validate(this.app.validator.article.id, ctx.params.id);
    ctx.body = await ctx.service.article.info(id);
  }

  async list(ctx) {
    ctx.body = await ctx.service.article.list();
  }

  async search(ctx) {
    ctx.body = await ctx.service.article.search();
  }

  async delete(ctx) {
    ctx.body = await ctx.service.article.delete();
  }

  async like(ctx) {
    ctx.body = await ctx.service.article.like();
  }
}

module.exports = ArticleController;
