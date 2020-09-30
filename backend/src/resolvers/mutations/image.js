const hasPermissions = require('../../lib/hasPermissions')

const imageMutations = {
  async uploadImage(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

    if (!args.categoryId && !args.productId) {
      throw new Error('Either the categoryId or the productId has to be set')
    }
    if (args.categoryId) {
      // category image
      const categoryId = args.categoryId
      delete args.categoryId
      delete args.productId
      const image = await ctx.db.mutation.createImage(
        {
          data: {
            category: {
              connect: {
                id: categoryId,
              },
            },
            ...args,
          },
        },
        info
      )
      return image
    }
    if (args.productId) {
      // product image
      const productId = args.productId
      delete args.categoryId
      delete args.productId
      const image = await ctx.db.mutation.createImage(
        {
          data: {
            product: {
              connect: {
                id: productId,
              },
            },
            ...args,
          },
        },
        info
      )
      return image
    }
  },

  async deleteImage(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

    const where = { id: args.id }
    return ctx.db.mutation.deleteImage({ where }, info)
  },
}

module.exports = imageMutations
