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
}

module.exports = mutations
