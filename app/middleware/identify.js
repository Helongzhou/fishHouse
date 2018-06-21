'use strict';

module.exports = (mode = 1) => {
  return async function(ctx, next) {

    if (!ctx.header || !ctx.header.authorization) {
      ctx.throw(401, 'None Authorization header.');
      return next();
    }

    const parts = ctx.header.authorization.split(' ');
    const jwtToken = parts[1];

    if (parts.length !== 2) {
      //  没有jwt token在authorization header，退出
      ctx.throw(401, 'None jwt_token in Authorization header.');
      return next();
    }

    // 调用jwt服务解密token
    try {
      const userInfo = ctx.service.token.verify(jwtToken).data;
      if (userInfo) {
        ctx.state.user = userInfo;
      }
    } catch (error) {
      if (mode === 1) {
        ctx.throw(401, 'Token Invalid');
      }
    }

    return next();
  };
};

