const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
}

module.exports = mutations
