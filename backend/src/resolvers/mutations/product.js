const hasPermissions = require('../../lib/hasPermissions')

const productMutations = {
  async createProduct(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'PRODUCTCREATE'])

    return await ctx.db.mutation.createProduct({ data: {} }, info)
  },

  async deleteProduct(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'PRODUCTDELETE'])

    const where = { id: args.id }
    return ctx.db.mutation.deleteProduct({ where }, info)
  },

  async updateProduct(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'PRODUCTUPDATE'])

    // take a copy of updates
    const updates = { ...args, code: args.code.toUpperCase() }
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

  /*
 

 

  async sortCategories(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

    const categories = args.categories
    categories.map(async (id, index) => {
      await ctx.db.mutation.updateCategory({
        where: { id },
        data: { sorting: index + 1 },
      })
    })
    return {
      message: 'Categories sorted',
    }
  },

  async uploadCategoryImage(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

    const categoryId = args.categoryId
    delete args.categoryId
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
  },

  async sortCategoryImages(parent, args, ctx, info) {
    hasPermissions(ctx, [])

    const images = args.images
    images.map(async (id, index) => {
      await ctx.db.mutation.updateImage({
        where: { id },
        data: { sorting: index + 1 },
      })
    })
    return {
      message: 'Images sorted',
    }
  },

  async deleteCategoryImage(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

    const where = { id: args.id }
    return ctx.db.mutation.deleteImage({ where }, info)
  },
  */
}

module.exports = productMutations
