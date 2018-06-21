'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const User = app.model.define('User', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: STRING(100),
      allowNull: true,
    },
    phone: {
      type: STRING(11),
      unique: true,
      allowNull: false,
    },
    password: {
      type: STRING(26),
      unique: true,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    tableName: 'user',
    timestamps: true,
    paranoid: true, // 此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
  });

  return User;
};
