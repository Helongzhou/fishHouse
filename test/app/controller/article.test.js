'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/forum.test.js', () => {

  const base_path = '/article';
  const Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuaWNrbmFtZSI6IuWYu-WYu-WYuzAwIiwic2V4IjoiMiIsImF2YXRlciI6IjMxMzliZTUzLTJjMGUtNGE3Ny1hMDY4LTIzMTNkNzM4ZmJhMCIsInBob25lIjpudWxsLCJlbWFpbCI6InRlc3Q0QHRlc3QuY29tIn0sImV4cCI6MTUzMDc1NzUyNCwiaWF0IjoxNTMwNjY5MzUyfQ.vAGZo71SGuSJWmsx49Emzqc5x56Xyifv1YY93JKUV2w';
  const genRandom = (floor, ceil) => parseInt(Math.random() * (ceil - floor + 1) + floor);
  const code = genRandom(111111, 999999);
  let article_id;

  it.only('POST create article with attr should return article id', () => {
    return app.httpRequest()
      .post(`${base_path}`)
      .set('Authorization', Authorization)
      .send({
        title: `TEST_NAME_${code}`,
        content: 'TEST_DESCRIPTION ..........',
        section_id: '1',
      })
      .expect(res => {
        assert(res.body.id > 0);
        article_id = res.body.id;
      })
      .expect(200);
  });

  it.only('PUT update article with attr should return 1', () => {
    return app.httpRequest()
      .put(`${base_path}/${article_id}`)
      .set('Authorization', Authorization)
      .send({
        title: `TEST_NAME_${code}`,
        content: `TEST_DESCRIPTION ..........${code}`,
      })
      .expect(res => {
        assert(Array.isArray(res.body) === true);
        assert(res.body[0] === 1);
      })
      .expect(200);
  });

  it.only('GET check article info with attr should return article info', () => {
    return app.httpRequest()
      .get(`${base_path}/${article_id}`)
      .set('Authorization', Authorization)
      .expect(res => {
        assert(res.body.id > 0);
      })
      .expect(200);
  });

  it.only('GET check article with attr should return article list', () => {
    return app.httpRequest()
      .get(`${base_path}?page=1&per_page=10&section_id=1&type=0`)
      .set('Authorization', Authorization)
      .expect(res => {
        assert(Array.isArray(res.body.rows) === true);
        assert(res.body.count > 0);
      })
      .expect(200);
  });

  it.only('GET search article with keyword should return article list', () => {
    return app.httpRequest()
      .get(`${base_path}/TEST_NAME_/search`)
      .set('Authorization', Authorization)
      .expect(res => {
        assert(Array.isArray(res.body.rows) === true);
        assert(res.body.count > 0);
      })
      .expect(200);
  });

  it.only('DELETE destroy article with id should return 1', () => {
    return app.httpRequest()
      .delete(`${base_path}/${article_id}`)
      .set('Authorization', Authorization)
      .expect(res => {
        assert(res.body === 1);
      })
      .expect(200);
  });

});
