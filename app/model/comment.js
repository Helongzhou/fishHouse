'use strict';

module.exports = app => {
  const { INTEGER, STRING, DataTypes } = app.Sequelize;
  const Model = app.model.define('comment', {// 评论表
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    article_id: {// 帖子id
      type: INTEGER,
      allowNull: false,
    },
    content: {
      type: STRING(100),
      allowNull: false,
    },
    author: { // 是否帖子作者
      type: DataTypes.ENUM('true', 'false'),
      allowNull: false,
      defaultValue: 'false',
    },
    user_id: {// 用户id
      type: INTEGER,
      allowNull: false,
    },
    user_nickname: {// 用户昵称
      type: STRING(100),
      allowNull: false,
    },
    user_avater: {// 用户头像
      type: STRING(100),
      allowNull: false,
    },
    to_uid: {// 目标用户id 如果为空则是评论，否则为回复
      type: INTEGER,
      allowNull: true,
    },
    like: {// 点赞数
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    freezeTableName: true,
    tableName: 'comment',
    timestamps: true,
  });

  // Model.associate = function() {
  //   const { like } = app.model.models;
  //   this.hasMany(like, { foreignKey: 'type_id', as: 'likes' });
  // };

  return Model;
};
