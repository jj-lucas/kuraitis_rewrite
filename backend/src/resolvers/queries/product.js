const hasPermissions = require('../../lib/hasPermissions')

const productQueries = {
  async products(parent, args, ctx, info) {
    // get all products
    const products = await ctx.db.query.products({ orderBy: 'sorting_ASC' })
    // iterate and enrich with images
    products.map((product, index) => {
      const images = ctx.db.query.images(
        {
          where: {
            product: {
              id: product.id,
            },
          },
          orderBy: 'sorting_ASC',
        },
        `{
          id
          sorting
          image
          largeImage
        }
        `
      )
      products[index].images = images
    })

    return products
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

    // get by ID
    const product = await ctx.db.query.product(
      {
        where: {
          id: idToLookFor,
        },
      },
      info
    )

    const images = await ctx.db.query.images(
      {
        where: {
          product: {
            id: idToLookFor,
          },
        },
        orderBy: 'sorting_ASC',
      },
      `{
            sorting
            id
            image
            largeImage
          }
          `
    )

    return { ...product, images: [...images] }
  },
}

module.exports = productQueries
