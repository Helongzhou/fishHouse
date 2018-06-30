'use strict';

module.exports = () => {
  return async function(ctx, next) {

    const parts = ctx.header.authorization.split(' ');
    const jwtToken = parts[1];
    // 调用jwt服务解密token
    const { data } = ctx.service.token.verify(jwtToken);
    // 检查是否管理员
    if (data.role !== 0) {
      ctx.throw(401, 'Permission denied');
    }

    return next();
  };
};

