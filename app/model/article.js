'use strict';

module.exports = app => {
  const { INTEGER, STRING, DataTypes } = app.Sequelize;
  const Model = app.model.define('article', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: STRING(30),
      unique: true,
      allowNull: false,
    },
    content: {
      type: STRING(1000),
      allowNull: false,
    },
    user_id: {// 作者id
      type: INTEGER,
      allowNull: false,
    },
    user_nickname: {// 作者昵称
      type: STRING(100),
      allowNull: false,
    },
    user_avater: {// 作者头像
      type: STRING(100),
      allowNull: false,
    },
    good: { // 是否精华
      type: DataTypes.ENUM('true', 'false'),
      allowNull: false,
      defaultValue: 'true',
    },
    top: {// 是否置顶
      type: DataTypes.ENUM('true', 'false'),
      allowNull: false,
      defaultValue: 'true',
    },
    section_id: {// 小版块id
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },
    like: {// 赞数量
      type: INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },
    read: {// 阅读量
      type: INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },
    comment: {// 评论数
      type: INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    tableName: 'article',
    timestamps: true,
    paranoid: true,
  });

  Model.comment = function(id) {
    this.increment({ comment: 1 },
      { where: { id } });
  };

  Model.read = function(id) {
    this.increment({ read: 1 },
      { where: { id } });
  };

  Model.like = function(id) {
    this.increment({ like: 1 },
      { where: { id } });
  };

  Model.unlike = function(id) {
    this.decrement({ like: 1 },
      { where: { id } });
  };

  Model.associate = function() {
    const { comment } = app.model.models;
    this.hasMany(comment, { foreignKey: 'article_id', as: 'comments' });
  };

  return Model;
};
