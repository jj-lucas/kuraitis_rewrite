const hasPermissions = require('../../lib/hasPermissions')

const categoryQueries = {
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
}

module.exports = categoryQueries
