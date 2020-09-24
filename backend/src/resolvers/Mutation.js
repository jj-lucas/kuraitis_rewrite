const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hasPermissions = (ctx, eligiblePermissions) => {
  if (!ctx.request.userId) {
    throw new Error('You must be logged in to do this')
  }
  const hasPermission = ctx.request.user.permissions.some((permission) =>
    eligiblePermissions.includes(permission)
  )
  if (!hasPermission) {
    throw new Error("You don't have permission to do this")
  }
}

const mutations = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase()
    // hash the passsword
    const password = await bcrypt.hash(args.password, 10)
    // create the user in the DB
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    )

    // create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    // set the JWT as a cooke on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })

    // return the user to the browser
    return user
  },

  async signin(parent, { email, password }, ctx, info) {
    // check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user for ${email}`)
    }

    // check if the password matches
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    // generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    // set a cookie with that token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })

    // return the user
    return user
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return {
      message: 'Goodbye',
    }
  },

  async createCategory(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYCREATE'])

    return await ctx.db.mutation.createCategory({ data: {} }, info)
  },

  async deleteCategory(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYDELETE'])

    await ctx.db.mutation.deleteManyCategoryImages({
      where: {
        category: {
          id: args.id,
        },
      },
    })

    return ctx.db.mutation.deleteCategory({ where: { id: args.id } }, info)
  },

  async updateCategory(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

    // take a copy of updates
    const updates = { ...args }
    // remove the ID from the updates
    delete updates.id
    // run the update method
    return ctx.db.mutation.updateCategory(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    )
  },

  async uploadCategoryImage(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

    const categoryId = args.categoryId
    delete args.categoryId
    const image = await ctx.db.mutation.createCategoryImage(
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

  async deleteCategoryImage(parent, args, ctx, info) {
    hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

    const where = { id: args.id }
    return ctx.db.mutation.deleteCategoryImage({ where }, info)
  },
}

module.exports = mutations
