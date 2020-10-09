const hasPermissions = require('../../lib/hasPermissions')
const makeMultiPrice = require('../../lib/utils')
const axios = require('axios')

const productMutations = {
  async createProduct(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'PRODUCTCREATE'])

    return await ctx.db.mutation.createProduct(
      {
        data: {
          categories: args.category
            ? {
                connect: [{ id: args.category }],
              }
            : null,
        },
      },
      info
    )
  },

  async deleteProduct(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'PRODUCTDELETE'])

    // delete all SKUs related to this product
    await ctx.db.mutation.deleteManySKUs({
      where: {
        product: {
          id: args.id,
        },
      },
    })

    const where = { id: args.id }
    return ctx.db.mutation.deleteProduct({ where }, info)
  },

  async updateProduct(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'PRODUCTUPDATE'])

    // delete all SKUs related to this product
    await ctx.db.mutation.deleteManySKUs({
      where: {
        product: {
          id: args.id,
        },
      },
    })

    // generate SKUs based on the provided info
    const SKUs = args.skuData ? JSON.parse(args.skuData) : []

    const resp = await axios.get(
      'https://api.exchangeratesapi.io/latest?symbols=USD,EUR,GBP&base=DKK'
    )
    const conversionRates = resp.data.rates

    SKUs.map(async (entry) => {
      ctx.db.mutation.createSKU({
        data: {
          sku: entry.sku,
          price: entry.price
            ? {
                create: { ...makeMultiPrice(entry.price.DKK, conversionRates) },
              }
            : null,
          product: {
            connect: {
              id: args.id,
            },
          },
          image: null,
        },
      })
    })

    // clean up skuData
    delete args.skuData

    // sort images
    const images = args.images ? args.images : []
    images.map(async (id, index) => {
      await ctx.db.mutation.updateImage({
        where: { id },
        data: { sorting: index + 1 },
      })
    })

    // take a copy of updates
    const updates = {
      ...args,
      price: args.price
        ? {
            create: { ...makeMultiPrice(args.price, conversionRates) },
          }
        : null,
      code: args.code ? args.code.toUpperCase() : null,
      categories: {
        set:
          args.categories &&
          args.categories.map((cat) => {
            return { id: cat }
          }),
      },
      images: {
        set:
          args.images &&
          args.images.map((id) => {
            return { id }
          }),
      },
    }

    // remove the ID from the updates
    delete updates.id
    // run the update method
    return ctx.db.mutation.updateProduct(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    )
  },
}

module.exports = productMutations
