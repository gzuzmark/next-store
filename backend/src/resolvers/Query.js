const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current userId
    const { userId } = ctx.request;
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: { id: userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. check if the are logged in
    if (!ctx.request.userId) {
      throw new Error('Your are not loggend In!');
    }
    // 2.Check permissions if the user can query all users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    // 3. iF THE DO, QUERY ALL USERS

    return ctx.db.query.users({}, info);
  },
};

module.exports = Query;
