'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/forum.test.js', () => {

  const base_path = '/comment';
  const Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuaWNrbmFtZSI6IuWTiOWTiOWTiCIsInBob25lIjoiMTg2ODIyNTc4MzAiLCJlbWFpbCI6bnVsbH0sImV4cCI6MTUzMDQyNzg0MCwiaWF0IjoxNTMwMzM5NzYyfQ.uR5zkibtn8qPwDq4P2COxIJz6mZKLKyb6U4B08R3sik';
  let id;

  it('POST create forum with attr should return forum id', () => {
    return app.httpRequest()
      .post(`${base_path}`)
      .set('Authorization', Authorization)
      .send({
        name: 'TEST_NAME_',
        description: 'TEST_DESCRIPTION ..........',
      })
      .expect(res => {
        assert(res.body.id > 0);
        id = res.body.id;
      })
      .expect(200);
  });

  it('GET check forum info should return forum list', () => {
    return app.httpRequest()
      .get(`${base_path}`)
      .set('Authorization', Authorization)
      .expect(res => {
        assert(Array.isArray(res.body) === true);
      })
      .expect(200);
  });

  it('DELETE destroy forum with id should return 1', () => {
    return app.httpRequest()
      .delete(`${base_path}/${id}`)
      .set('Authorization', Authorization)
      .expect(res => {
        assert(res.body === 1);
      })
      .expect(200);
  });

});
