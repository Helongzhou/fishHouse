'use strict';

// had enabled by egg
// exports.static = true;


exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.joi = {
  enable: true,
  package: 'egg-joi',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

// 这里关闭security的原因是不用每次动态的添加token，开发阶段很麻烦
exports.security = {
  enable: false,
};
