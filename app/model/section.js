'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Model = app.model.define('section', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING(26),
      allowNull: false,
    },
    description: {
      type: STRING(100),
      allowNull: false,
    },
    forum_id: {// 所属论坛id
      type: INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    tableName: 'section',
    timestamps: true,
  });


  return Model;
};
