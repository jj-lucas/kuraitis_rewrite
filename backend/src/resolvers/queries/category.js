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
    return await ctx.db.query.category(
      {
        where: {
          id: idToLookFor,
        },
      },
      info
    )
  },

  async categories(parent, args, ctx, info) {
    // get all categories
    return await ctx.db.query.categories({ orderBy: 'sorting_ASC' }, info)
  },
}

module.exports = categoryQueries
