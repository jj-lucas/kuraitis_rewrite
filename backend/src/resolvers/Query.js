const { forwardTo } = require('prisma-binding')

const Query = {
  category: forwardTo('db'),

  async getCategoryInfo(parent, args, ctx, info) {
    const category = await ctx.db.query.category(
      {
        where: {
          id: args.id,
        },
      },
      info
    )
    const categoryImages = await ctx.db.query.categoryImages(
      {
        where: {
          category: {
            id: args.id,
          },
        },
      },
      `{
        image
        largeImage
      }
      `
    )

    console.log(categoryImages)
    return { ...category, images: [...categoryImages] }

    return ctx.db.query.users({}, info)
  },

  async users(parent, args, ctx, info) {
    // 3. if they do, query all the users
    return ctx.db.query.users({}, info)
  },

  async categories(parent, args, ctx, info) {
    return ctx.db.query.categories({}, info)
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
}

module.exports = Query
