'use strict';

module.exports = app => {
  const { INTEGER, DataTypes } = app.Sequelize;
  const Model = app.model.define('like', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {// 点赞类型 0：文章 1：评论
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
    },
    // type_id: {// 文章或者评论的id
    //   type: INTEGER.UNSIGNED,
    //   allowNull: false,
    // },
    user_id: {// 点赞用户
      type: INTEGER,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    tableName: 'like',
    timestamps: true,
    paranoid: true,
  });

  Model.associate = function() {

  };

  return Model;
};
