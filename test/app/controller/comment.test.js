'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe.only('test/app/controller/comment.test.js', () => {

  const base_path = '/comment';
  const Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuaWNrbmFtZSI6IuWYu-WYu-WYuzAwIiwic2V4IjoiMiIsImF2YXRlciI6IjNiYWUxZTMzLTdlY2ItNDgxYy1hNThjLWFhNTdkYmNhZmUyMCIsInBob25lIjpudWxsLCJlbWFpbCI6InRlc3Q0QHRlc3QuY29tIn0sImV4cCI6MTUzMDk0ODU0OSwiaWF0IjoxNTMwODYwMzU1fQ.knNj3gfvnAkP1vZ0wLjsLjed0T2X9ba2l0ORCT7RbEA';
  const article_id = '1';
  let id;

  it('POST create comment with attr should return comment id', () => {
    return app.httpRequest()
      .post(`${base_path}`)
      .set('Authorization', Authorization)
      .send({
        article_id,
        content: 'TEST_DESCRIPTION ..........',
        // to_uid: '',
      })
      .expect(res => {
        assert(res.body > 0);
        id = res.body;
      })
      .expect(200);
  });

  it('GET check comment with attr should return comment list', () => {
    return app.httpRequest()
      .get(`${base_path}?page=1&per_page=10&article_id=${article_id}`)
      .set('Authorization', Authorization)
      .expect(res => {
        assert(Array.isArray(res.body) === true);
        assert(res.body.length > 0);
      })
      .expect(200);
  });

  it('DELETE destroy comment with id should return 1', () => {
    return app.httpRequest()
      .delete(`${base_path}/${id}`)
      .set('Authorization', Authorization)
      .expect(res => {
        assert(res.body === 1);
      })
      .expect(200);
  });

});
