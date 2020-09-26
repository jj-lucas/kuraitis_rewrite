const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hasPermissions = require('../lib/hasPermissions')

const mutations = {
  ...require('./mutations/user'),
  ...require('./mutations/category'),
  ...require('./mutations/product'),

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

  // IMAGE
  async uploadImage(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

    if (!args.categoryId && !args.productId) {
      throw new Error('Either the categoryId or the productId has to be set')
    }
    if (args.categoryId) {
      // category image
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
    }
  },

  async sortImages(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

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

  async deleteImage(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

    const where = { id: args.id }
    return ctx.db.mutation.deleteImage({ where }, info)
  },
}

module.exports = mutations
