const hasPermissions = require('../../lib/hasPermissions')

const productQueries = {
  async products(parent, args, ctx, info) {
    // get all products
    return await ctx.db.query.products({ orderBy: 'sorting_ASC' }, info)
  },

  async product(parent, args, ctx, info) {
    let idToLookFor = args.id
    if (!idToLookFor) {
      // get by code
      const eligibleProducts = await ctx.db.query.products(
        {
          where: {
            code: args.code,
          },
        },
        `{
              id
            }
            `
      )
      idToLookFor = eligibleProducts.map((product) => product.id)[0]

      if (!idToLookFor) return null
    }

    const eligibleSKUs = await ctx.db.query.sKUs(
      {
        where: {
          product: {
            id: args.id,
          },
        },
      },
      `{
        id
        sku
        price
        image {
          id
          image
        }
      }`
    )

    // get by ID
    const product = await ctx.db.query.product(
      {
        where: {
          id: idToLookFor,
        },
      },
      info
    )

    return {
      ...product,
      skus: eligibleSKUs,
    }
  },
}

module.exports = productQueries
