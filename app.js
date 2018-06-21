'use strict';

module.exports = app => {
  if (app.config.env === 'local') {
    app.beforeStart(function* () {
      yield app.model.sync({ force: true });
    });
  }
};
