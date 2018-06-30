'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/forum.test.js', () => {

  const base_path = '/admin/forum';
  let forum_id;

  it('POST create forum with attr should return forum id', () => {
    return app.httpRequest()
      .post(`${base_path}`)
      .send({
        name: `TEST_NAME_${Math.round(Math.random() * 10000)}`,
        description: 'TEST_description ..........',
      })
      .expect(200)
      .expect(function(res) {
        assert(forum_id = res.body.id);
        console.log(forum_id);
      });
  });

});
