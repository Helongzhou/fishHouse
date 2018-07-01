'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/forum.test.js', () => {

  const base_path = '/admin/forum';
  const Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuaWNrbmFtZSI6IuWTiOWTiOWTiCIsInBob25lIjoiMTg2ODIyNTc4MzAiLCJlbWFpbCI6bnVsbH0sImV4cCI6MTUzMDQyNzg0MCwiaWF0IjoxNTMwMzM5NzYyfQ.uR5zkibtn8qPwDq4P2COxIJz6mZKLKyb6U4B08R3sik';
  let forum_id;

  it('POST create forum with attr should return forum id', () => {
    return app.httpRequest()
      .post(`${base_path}`)
      .set('Authorization', Authorization)
      .send({
        name: 'TEST_NAME_',
        description: 'TEST_DESCRIPTION ..........',
      })
      .expect(200)
      .expect(res => {
        assert(res.body.id > 0);
        forum_id = res.body.id;
      });
  });

  it('PUT update forum with attr should return 1', () => {
    return app.httpRequest()
      .put(`${base_path}/${forum_id}`)
      .set('Authorization', Authorization)
      .send({
        name: 'UPDATE_NAME___000',
        description: 'UPDATE_DESCRIPTION ...00.......',
      })
      .expect(200)
      .expect(res => {
        assert(Array.isArray(res.body) === true);
        assert(res.body[0] === 1);
      });
  });

  it('GET check forum info should return forum list', () => {
    return app.httpRequest()
      .get('/forum')
      .set('Authorization', Authorization)
      .expect(200)
      .expect(res => {
        assert(Array.isArray(res.body) === true);
      });
  });

  it('DELETE destroy forum with id should return 1', () => {
    return app.httpRequest()
      .delete(`${base_path}/${forum_id}`)
      .set('Authorization', Authorization)
      .expect(200)
      .expect(res => {
        assert(res.body === 1);
      });
  });

});
