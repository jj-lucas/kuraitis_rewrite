const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hasPermissions = require('../lib/hasPermissions')

const mutations = {
  ...require('./mutations/user'),
  ...require('./mutations/category'),

  async createReport(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'REPORT'])

    return await ctx.db.mutation.createReport(
      {
        data: {
          ...args,
        },
      },
      info
    )
  },
  async deleteReport(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'REPORT'])

    const where = { id: args.id }
    return ctx.db.mutation.deleteReport({ where }, info)
  },
}

module.exports = mutations
