const jwt = require('jsonwebtoken')
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

  async cart(parent, args, ctx, info) {
    const { cartToken } = ctx.request.cookies
    if (cartToken) {
      try {
        const { cartId } = jwt.verify(cartToken, process.env.APP_SECRET)

        // check if such a cart exists
        const cart = await ctx.db.query.cart(
          {
            where: {
              id: cartId,
            },
          },
          `{ id items }`
        )

        // if it does, retrieve SKU data and parse items
        if (cart) {
          const result = {
            ...cart,
          }
          if (cart.items) {
            result.skus = await ctx.db.query.sKUs(
              {
                where: {
                  sku_in: cart.items.split('|'),
                },
              },
              `{
                id
                sku
                price {
                  DKK
                  USD
                  EUR
                  GBP
                }
                product {
                  price {
                    DKK
                    USD
                    EUR
                    GBP
                  }
                  images {
                    image
                  }
                  name_da
                  name_en
                  selectedAttributes
                }
                image {
                  image
                }
              }`
            )

            // only pass items for which we have valid SKUs for
            result.items = cart.items
              ? cart.items
                  .split('|')
                  .filter((skuToFind) =>
                    result.skus.find((sku) => skuToFind === sku.sku)
                  )
              : []
          } else {
            result.items = []
          }

          return result
        } else {
          // we requested a cart ID that does not exist, clear this invalid cart token
          ctx.response.clearCookie('cartToken')
        }
      } catch (e) {
        // clear this invalid cart token
        ctx.response.clearCookie('cartToken')
      }
    }

    // there was no cart token provided
    return null
  },
}

module.exports = Query
