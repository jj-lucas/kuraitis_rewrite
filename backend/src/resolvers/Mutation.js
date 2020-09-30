const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { forwardTo } = require('prisma-binding')
const hasPermissions = require('../lib/hasPermissions')

const mutations = {
  ...require('./mutations/user'),
  ...require('./mutations/category'),
  ...require('./mutations/product'),
  ...require('./mutations/image'),

  // REPORT
  async createReport(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'REPORTCREATE'])

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
    hasPermissions(ctx, ['ADMIN', 'REPORTRESOLVE'])

    const where = { id: args.id }
    return ctx.db.mutation.deleteReport({ where }, info)
  },

  // SKU
  createSKU: forwardTo('db'),
  updateSKU: forwardTo('db'),
}

module.exports = mutations
