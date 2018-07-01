'use strict';

module.exports = app => {
  const { INTEGER, STRING, UUIDV4 } = app.Sequelize;
  const Model = app.model.define('user', {
    id: {
      type: INTEGER,
      autoIncrement: 10000,
      primaryKey: true,
    },
    phone: {
      type: STRING(11),
      unique: true,
      allowNull: true,
    },
    email: {
      type: STRING(50),
      unique: true,
      allowNull: true,
    },
    password: {
      type: STRING(100),
      allowNull: true,
    },
    role: {// 用户角色 0：超级管理员 1：大版主 2：小版主 3：普通用户
      type: INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    points: {// 积分 表示用户活跃程度 发帖+10 评论+2
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    prestige: {// 声望 表示用户专业程度 文章被赞+5 文章被收藏+1
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    nickname: {
      type: STRING(100),
      allowNull: false,
      defaultValue: UUIDV4,
    },
    sex: {// 性别 0：女 1：男 2：未知性别
      type: STRING(100),
      allowNull: false,
      defaultValue: 2,
    },
    avater: {// 头像
      type: STRING(100),
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    tableName: 'user',
    timestamps: true,
    paranoid: true, // 此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
  });

  Model.associate = function() {
    const { article, comment } = app.model.models;
    this.hasMany(article, { foreignKey: 'user_id', as: 'articles' });
    this.hasMany(comment, { foreignKey: 'user_id', as: 'comments' });
    // https://itbilu.com/nodejs/npm/41qaV3czb.html#associations-one-to-many
    // One-To-Many关联是指一个源模型连接多个目标模型。反之目标模型都会有一个明确的源。这是一种单向关联方式.
    // 会向 article和reply 中添加一个user_id属性。user 的实例中会有访问器getArticles .
  };

  return Model;
};
