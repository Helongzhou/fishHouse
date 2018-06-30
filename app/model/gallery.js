'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Model = app.model.define('gallery', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // article_id: {// 帖子id
    //   type: INTEGER,
    //   allowNull: false,
    // },
    name: {
      type: STRING(100),
      allowNull: false,
    },
    description: {
      type: STRING(256),
      allowNull: false,
    },
    url: {
      type: STRING(256),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    tableName: 'gallery',
    timestamps: true,
  });

  return Model;
};
