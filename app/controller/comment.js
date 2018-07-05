'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {


  async create(ctx) {
    const { value: { article_id, content, to_uid } } = ctx.validate(this.app.validator.comment.create, ctx.request.body);
    ctx.body = await ctx.service.comment.create(article_id, content, to_uid);
  }

  async list(ctx) {
    const { value: { article_id, page, per_page } } = ctx.validate(this.app.validator.comment.list, ctx.query);
    ctx.body = await ctx.service.comment.list(article_id, page, per_page);
  }

  async destroy(ctx) {
    const { value: id } = ctx.validate(this.app.validator.comment.id, ctx.params.id);
    ctx.body = await ctx.service.comment.destroy(id);
  }
}

module.exports = CommentController;
