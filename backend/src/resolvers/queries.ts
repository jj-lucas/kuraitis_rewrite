import { FileWatcherEventKind } from 'typescript'
import { Context } from '../index'
const jwt = require('jsonwebtoken')
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
		return await ctx.prisma.user.findUnique({
			where: {
				id: ctx.request.userId,
			},
			include: {
				permissions: true,
			},
		})
	},

	reports: async (parent, args, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		return ctx.prisma.report.findMany()
	},

	products: async (parent, { categorySlug }, ctx: Context, info) => {
		return ctx.prisma.product.findMany({
			where: categorySlug
				? {
						categories: {
							some: {
								OR: [
									{
										slug_da: categorySlug,
									},
									{
										slug_en: categorySlug,
									},
								],
							},
						},
				  }
				: {},
			include: {
				categories: true,
				images: {
					orderBy: [{ sorting: 'asc' }],
				},
				price: true,
			},
			orderBy: [
				{
					sorting: 'asc',
				},
			],
		})
	},

	product: async (parent, { id, code }, ctx: Context, info) => {
		if ((!id && !code) || (id && code)) {
			throw new Error('You must provide an ID or a code')
		}

		const where = id ? { id } : { code }

		const product = await ctx.prisma.product.findUnique({
			where,
			include: {
				price: true,
				images: {
					orderBy: [{ sorting: 'asc' }],
				},
				skus: {
					include: {
						image: true,
						price: true,
					},
				},
				categories: true,
			},
		})

		if (!product) {
			throw new Error('No product found for this ID / code')
		}

		return product
	},

	attributes: async (parent, args, ctx: Context, info) => {
		return ctx.prisma.attribute.findMany({
			orderBy: [{ position: 'asc' }],
		})
	},

	shippingProfiles: async (parent, args, ctx: Context, info) => {
		return ctx.prisma.shippingProfile.findMany({
			include: {
				price: true,
			},
		})
	},

	categories: async (parent, args, ctx: Context, info) => {
		return ctx.prisma.category.findMany({
			include: {
				products: true,
				images: {
					orderBy: [{ sorting: 'asc' }],
				},
			},
			orderBy: [{ sorting: 'asc' }],
		})
	},

	category: async (parent, { id, slug_da, slug_en }, ctx: Context, info) => {
		if (!id && !slug_da && !slug_en) {
			throw new Error('You must provide an ID or a slug')
		}

		return ctx.prisma.category.findFirst({
			where: {
				OR: [{ id }, { slug_da: slug_da ? slug_da : null }, { slug_en: slug_en ? slug_en : null }],
			},
			include: {
				products: {
					include: {
						price: true,
						images: {
							orderBy: [{ sorting: 'asc' }],
						},
					},
				},
				images: {
					orderBy: [{ sorting: 'asc' }],
				},
			},
		})
	},

	cart: async (parent, args, ctx: Context, info) => {
		const { cartToken } = ctx.request.cookies
		if (cartToken) {
			try {
				const { cartId } = jwt.verify(cartToken, process.env.APP_SECRET)

				// check if such a cart exists
				const cart = await ctx.prisma.cart.findUnique({
					where: {
						id: cartId,
					},
					include: {
						cartSkus: {
							include: {
								sku: {
									include: {
										product: {
											include: {
												price: true,
												images: {
													orderBy: [{ sorting: 'asc' }],
												},
											},
										},
										price: true,
										image: true,
									},
								},
							},
						},
					},
				})

				if (cart) {
					return cart
				} else {
					// we requested a cart ID that does not exist, clear this invalid cart token
					ctx.response.clearCookie('cartToken')
				}
			} catch (e) {
				// clear this invalid cart token
				ctx.response.clearCookie('cartToken')
			}
		}

		// there was no cart token provided
		return null
	},

	order: async (parent, { id }, ctx: Context, info) => {
		const order = await ctx.prisma.order.findUnique({
			where: {
				id,
			},
			include: {
				items: true,
				customer: true,
			},
		})

		return order
	},

	orders: async (parent, args, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		return ctx.prisma.order.findMany({
			orderBy: [
				{
					shippedAt: 'desc',
				},
				{
					createdAt: 'desc',
				},
			],
			include: {
				items: true,
				customer: true,
			},
		})
	},
}

export default queryResolvers
