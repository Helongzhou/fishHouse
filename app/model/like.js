'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const Model = app.model.define('like', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {// 点赞用户
      type: INTEGER,
      allowNull: false,
    },
    comment_id: {// 评论id
      type: INTEGER,
      allowNull: true,
    },
    article_id: {// 文章id
      type: INTEGER,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    tableName: 'like',
    timestamps: true,
  });

  Model.associate = function() {

  };

  return Model;
};
