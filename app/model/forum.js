'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Model = app.model.define('forum', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      unique: true,
      type: STRING(26),
      allowNull: false,
    },
    description: {
      type: STRING(100),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    tableName: 'forum',
    timestamps: true,
  });

  Model.associate = function() {
    const { section } = app.model.models;
    this.hasMany(section, { foreignKey: 'forum_id', as: 'sections' });
  };

  return Model;
};
