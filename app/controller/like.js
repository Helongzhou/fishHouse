'use strict';

const Controller = require('egg').Controller;

class LikeController extends Controller {


  async article(ctx) {
    const { value: { article_id } } = ctx.validate(this.app.validator.like.article, ctx.request.body);
    ctx.body = await ctx.service.like.article(article_id);
  }

  async articleCancel(ctx) {
    const { value: article_id } = ctx.validate(this.app.validator.like.id, ctx.params.id);
    ctx.body = await ctx.service.like.articleCancel(article_id);
  }

  async comment(ctx) {
    const { value: { comment_id } } = ctx.validate(this.app.validator.like.comment, ctx.request.body);
    ctx.body = await ctx.service.like.comment(comment_id);
  }

  async commentCancel(ctx) {
    const { value: comment_id } = ctx.validate(this.app.validator.like.id, ctx.params.id);
    ctx.body = await ctx.service.like.commentCancel(comment_id);
  }
}

module.exports = LikeController;
