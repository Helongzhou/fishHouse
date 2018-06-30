'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
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
    user_id: {// 评论用户id
      type: INTEGER,
      allowNull: false,
    },
    to_uid: {// 目标用户id 如果为空则只是评论，否则为回复
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


  return Model;
};
