const { forwardTo } = require('prisma-binding')

const Query = {
  async users(parent, args, ctx, info) {
    // 3. if they do, query all the users
    return ctx.db.query.users({}, info)
  },

  async categories(parent, args, ctx, info) {
    return ctx.db.query.categories({}, info)
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
}

module.exports = Query
