import { Context } from '../index'
const hasPermissions = require('../lib/hasPermissions')

const queryResolvers = {
	users: async (parent, args, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		return ctx.prisma.user.findMany({
			include: {
				permissions: true,
			},
		})
	},

	currentUser: async (parent, args, ctx: Context, info) => {
		// check if there is a current user
		if (!ctx.request.userId) {
			return null
		}
		// there is, return it
		return await ctx.prisma.user.findOne({
			where: {
				id: ctx.request.userId,
			},
		})
	},
}

export default queryResolvers
