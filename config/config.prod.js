'use strict';

exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  database: 'fishHouse',
  host: 'localhost', // 193.112.12.82
  port: '3306',
  username: 'fishHouse',
  password: 'SffDKynwJy7ZR8H5',
  timezone: '+08:00',
};

exports.proxy = true;

exports.cluster = {
  listen: {
    port: 7001,
    hostname: '0.0.0.0',
  },
};
