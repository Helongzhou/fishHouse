'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {

  async update(ctx) {
    ctx.body = await ctx.service.article.update();
  }

  async create(ctx) {
    ctx.body = await ctx.service.article.create();
  }

  async info(ctx) {
    ctx.body = await ctx.service.article.info();
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
