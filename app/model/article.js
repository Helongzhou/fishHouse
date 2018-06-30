'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;
  const Model = app.model.define('article', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: STRING(30),
      allowNull: false,
    },
    content: {
      type: STRING(1000),
      allowNull: false,
    },
    user_id: {// 用户id
      type: INTEGER,
      allowNull: false,
    },
    good: { // 是否精华
      type: BOOLEAN,
      allowNull: false,
    },
    top: {// 是否置顶
      type: BOOLEAN,
      allowNull: false,
    },
    section_id: {// 小版块id
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    tableName: 'article',
    timestamps: true,
    paranoid: true,
  });

  Model.associate = function() {
    const { comment } = app.model.models;
    this.hasMany(comment, { foreignKey: 'article_id', as: 'comments' });
  };

  return Model;
};
