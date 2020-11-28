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
		return await ctx.prisma.user.findOne({
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

		return ctx.prisma.report.findMany({
			include: {
				image: true,
			},
		})
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

		const product = await ctx.prisma.product.findOne({
			where,
			include: {
				price: true,
				images: {
					orderBy: [{ sorting: 'asc' }],
				},
				skus: true,
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
			orderBy: [{ sorting: 'asc' }],
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
				OR: [{ id }, { slug_da }, { slug_en }],
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
				const cart = await ctx.prisma.cart.findOne({
					where: {
						id: cartId,
					},
				})

				// if it does, retrieve SKU data and parse items
				if (cart) {
					const result: {
						id: string
						items: string[]
						skus?: any
					} = {
						id: cart.id,
						items: [],
					}
					if (cart.items) {
						result.skus = await ctx.prisma.sku.findMany({
							where: {
								sku: { in: cart.items.split('|') },
							},
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
						})

						// only pass items for which we have valid SKUs for
						result.items = cart.items
							? cart.items.split('|').filter(skuToFind => result.skus.find(sku => skuToFind === sku.sku))
							: []
					}

					return result
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

	order: async (parent, args, ctx: Context, info) => {
		return ctx.prisma.order.findOne({
			where: {
				id: args.id,
				auth: args.auth,
			},
		})
	},

	orders: async (parent, args, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		return ctx.prisma.order.findMany()
	},
}

export default queryResolvers
