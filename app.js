'use strict';

module.exports = app => {
  if (app.config.env === 'local') {
    app.beforeStart(async function() {
      await app.model.sync({ force: true }); // 加force:true，会先删掉表后再建表
    });
  }
};
