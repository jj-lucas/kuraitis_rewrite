const { forwardTo } = require('prisma-binding')

const Query = {
  ...require('./queries/category'),
  ...require('./queries/product'),

  // USER
  async users(parent, args, ctx, info) {
    return ctx.db.query.users({}, info)
  },

  me(parent, args, ctx, info) {
    // check if there is a current user
    if (!ctx.request.userId) {
      return null
    }
    return ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      info
    )
  },

  // REPORT
  reports: forwardTo('db'),

  attributes: forwardTo('db'),
}

module.exports = Query
