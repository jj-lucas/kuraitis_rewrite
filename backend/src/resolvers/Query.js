const Query = {
  async users(parent, args, ctx, info) {
    // 3. if they do, query all the users
    return ctx.db.query.users({}, info)
  },
}

module.exports = Query
