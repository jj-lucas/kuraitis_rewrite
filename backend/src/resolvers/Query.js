const { forwardTo } = require('prisma-binding')

const Query = {
  ...require('./queries/category'),

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

  async reports(parent, args, ctx, info) {
    return ctx.db.query.reports(
      {
        where: {},
      },
      info
    )
  },
}

module.exports = Query
