import { Context } from '../index'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateJWT = (user, ctx) => {
	// generate a JWT token
	const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
	// set the JWT as a cookie on the response
	ctx.response.cookie('token', token, {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
	})
}

const mutationResolvers = {
	signUp: async (parent, { name, email, password }, ctx: Context, info) => {
		email = email.toLowerCase()

		// hash the password
		password = await bcrypt.hash(password, 10)

		// create the user in the DB
		const user = await ctx.prisma.user.create({
			data: {
				name,
				email,
				password,
				permissions: {
					connectOrCreate: {
						where: {
							name: 'USER',
						},
						create: {
							name: 'USER',
						},
					},
				},
			},
		})

		// generate a JWT token
		generateJWT(user, ctx)

		// return the user to the browser
		return user
	},

	signOut: async (parent, args, ctx: Context, info) => {
		ctx.response.clearCookie('token')
		return {
			message: 'Goodbye',
		}
	},

	signIn: async (parent, { email, password }, ctx: Context, info) => {
		// check if there is a user with that email
		const user = await ctx.prisma.user.findOne({ where: { email } })
		if (!user) {
			throw new Error('Invalid email or password')
		}

		// check if the password matches
		const valid = await bcrypt.compare(password, user.password)
		if (!valid) {
			throw new Error('Invalid email or password')
		}

		// generate a JWT token
		generateJWT(user, ctx)

		// return the user
		return user
	},
}

export default mutationResolvers
