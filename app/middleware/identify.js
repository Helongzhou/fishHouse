'use strict';

module.exports = () => {
  return async function(ctx, next) {

    if (!ctx.header || !ctx.header.authorization) {
      ctx.throw(401, 'None Authorization header.');
    }

    //  没有jwt token在authorization header，退出
    const parts = ctx.header.authorization.split(' ');
    const jwtToken = parts[1];
    if (parts.length !== 2) {
      ctx.throw(401, 'None jwt_token in Authorization header.');
    }

    // 判断jwt是否失效;
    const result = await ctx.service.token.isInvalid(jwtToken);
    if (result === 1) {
      ctx.throw(401, 'Token Illegal');
    }

    // 调用jwt服务解密token
    try {
      const { data } = ctx.service.token.verify(jwtToken);
      if (data) {
        ctx.state.user = data;
      }
    } catch (error) {
      ctx.throw(401, 'Token Invalid');
    }

    return next();
  };
};

