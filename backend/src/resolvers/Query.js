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
    const images = await ctx.db.query.images(
      {
        where: {
          category: {
            id: args.id,
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
    return { ...category, images: [...images] }
  },

  async users(parent, args, ctx, info) {
    return ctx.db.query.users({}, info)
  },

  async categories(parent, args, ctx, info) {
    // get all categories
    const categories = await ctx.db.query.categories()
    // iterate and enrich with images
    categories.map((category, index) => {
      const images = ctx.db.query.images(
        {
          where: {
            category: {
              id: category.id,
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
      categories[index].images = images
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

  async imageReports(parent, args, ctx, info) {
    return ctx.db.query.reports(
      {
        where: {
          image: { id_not: null },
        },
      },
      info
    )
  },

  async textReports(parent, args, ctx, info) {
    return ctx.db.query.reports(
      {
        where: {
          image: null,
        },
      },
      info
    )
  },
}

module.exports = Query
