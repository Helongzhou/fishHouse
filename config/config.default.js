'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_2018@SZXmeilin';

  // add your config here
  config.middleware = [ 'notfoundHandler', 'errorHandler', 'identify', 'adminIdentify' ];

  config.identify = {
    ignore: [ '/auth/register', '/auth/login', '/auth/verify' ],
  };

  config.adminIdentify = {
    match: '/admin',
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'fish_house',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
    timezone: '+08:00',
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  config.sessionRedis = {
    key: 'EGG_SESSION',
    maxAge: 24 * 3600 * 1000, // 默认 1 天过期
    httpOnly: true,
    encrypt: false,
  };

  config.joi = {
    options: {}, // Joi options [https://github.com/hapijs/joi/blob/v11.0.1/API.md#validatevalue-schema-options-callback]
    locale: {
      'zh-cn': {},
    },
    throw: true,
  };

  // config.onerror = {
  //   all(err, ctx) {
  //     // 在此处定义针对所有响应类型的错误处理方法 https://eggjs.org/zh-cn/core/error-handling.html#errorpageurl
  //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //     ctx.body = JSON.stringify(err);
  //     ctx.status = 500;
  //   },
  // };

  config.jwt = {
    secret: '2018@SZX',
    defaultExp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 1), // 默认过期时间1天
  };

  return config;
};
