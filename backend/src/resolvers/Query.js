const { forwardTo } = require('prisma-binding')

const getCategoryBySlug = async (ctx, slug_da, slug_en, info) => {
  const categories = await ctx.db.query.categories(
    {
      where: {
        OR: [{ slug_da }, { slug_en }],
      },
    },
    info
  )
  return categories.map((category) => category.id)[0]
}

const Query = {
  async category(parent, args, ctx, info) {
    let idToLookFor = args.id
    if (!idToLookFor) {
      // get by slug
      const eligibleCategories = await ctx.db.query.categories(
        {
          where: {
            OR: [{ slug_da: args.slug_da }, { slug_en: args.slug_en }],
          },
        },
        `{
          id
        }
        `
      )
      idToLookFor = eligibleCategories.map((category) => category.id)[0]

      if (!idToLookFor) return null
    }

    // get by ID
    const category = await ctx.db.query.category(
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
    const categories = await ctx.db.query.categories({ orderBy: 'sorting_ASC' })
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

  async reports(parent, args, ctx, info) {
    return ctx.db.query.reports(
      {
        where: {},
      },
      info
    )
  },
}

module.exports = Query
