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

  // Cart
  async updateCart(parent, args, ctx, info) {
    let cart = null
    let gottaRegenerateCookie = false

    // if a cart ID is provided
    if (args.id) {
      // find cart to update
      cart = await ctx.db.query.cart(
        {
          where: {
            id: args.id,
          },
        },
        info
      )
      if (!cart) {
        // clear the cookie to prevent future errors
        ctx.response.clearCookie('cartToken')
        gottaRegenerateCookie = true
      }
      if (cart) {
        // if a cart for this ID existed, update it
        cart = await ctx.db.mutation.updateCart(
          {
            where: {
              id: cart.id,
            },
            data: {
              items: args.items.join('|'),
            },
          },
          info
        )
      }
    }

    if (!cart) {
      gottaRegenerateCookie = true
      // create a new cart
      cart = await ctx.db.mutation.createCart(
        {
          data: {
            items: args.items.join('|'),
          },
        },
        info
      )
    }

    if (gottaRegenerateCookie) {
      // generate a JWT token for the cart
      const newCartToken = jwt.sign({ cartId: cart.id }, process.env.APP_SECRET)

      // set a cookie with that cart
      ctx.response.cookie('cartToken', newCartToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      })
    }

    return cart
  },
}

module.exports = mutations
