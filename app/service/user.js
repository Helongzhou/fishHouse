'use strict';

const Service = require('egg').Service;

class AuthService extends Service {


  async findOrCreate(phone) {
    const user = await this.app.model.User.findOrCreate({ where: { phone }, defaults: { phone } });
    console.log(user);
    return user;
  }

  async create(phone, password, nickname) {
    const user = await this.app.model.User.create({ phone, password, nickname });
    return user;
  }

  async find(phone) {
    const user = await this.app.model.User.find({ where: phone });
    return user;
  }

}

module.exports = AuthService;
