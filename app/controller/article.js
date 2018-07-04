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
    const { value: { page, per_page, section_id, type } } = ctx.validate(this.app.validator.article.list, ctx.query);
    ctx.body = await ctx.service.article.list(page, per_page, section_id, type);
  }

  async search(ctx) {
    const { value } = ctx.validate(this.app.validator.article.keyword, ctx.params.keyword);
    ctx.body = await ctx.service.article.search(value);
  }

  async destroy(ctx) {
    const { value } = ctx.validate(this.app.validator.article.id, ctx.params.id);
    ctx.body = await ctx.service.article.destroy(value);
  }

  async like(ctx) {
    ctx.body = await ctx.service.article.like();
  }
}

module.exports = ArticleController;
