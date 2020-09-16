const { forwardTo } = require('prisma-binding')

const Query = {
  async category(parent, args, ctx, info) {
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
        id
        image
        largeImage
      }
      `
    )
    return { ...category, images: [...categoryImages] }
  },

  async users(parent, args, ctx, info) {
    return ctx.db.query.users({}, info)
  },

  async categories(parent, args, ctx, info) {
    // get all categories
    const categories = await ctx.db.query.categories()
    // iterate and enrich with images
    categories.map((category, index) => {
      const categoryImages = ctx.db.query.categoryImages(
        {
          where: {
            category: {
              id: category.id,
            },
          },
        },
        `{
          id
          image
          largeImage
        }
        `
      )
      categories[index].images = categoryImages
    })
    return categories
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
