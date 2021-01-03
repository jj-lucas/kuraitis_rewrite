import { Context } from '../index'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const { promisify } = require('util')
const { randomBytes } = require('crypto')
const stripe = require('stripe')
const hasPermissions = require('../lib/hasPermissions')
import { makeMultiPrice } from '../lib/utils'
import { sendConfirmationMail, sendShippingMail } from '../lib/mail'

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

	createImage: async (parent, args, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN', 'CATEGORYUPDATE'])

		if (!args.categoryId && !args.productId) {
			throw new Error('Either the categoryId or the productId has to be set')
		}

		if (args.categoryId) {
			// category image
			const categoryId = args.categoryId
			delete args.categoryId
			delete args.productId
			const image = await ctx.prisma.image.create({
				data: {
					category: {
						connect: {
							id: categoryId,
						},
					},
					...args,
				},
			})
			return image
		}

		if (args.productId) {
			// product image
			const productId = args.productId
			delete args.categoryId
			delete args.productId
			const image = await ctx.prisma.image.create({
				data: {
					product: {
						connect: {
							id: productId,
						},
					},
					...args,
				},
			})
			return image
		}
	},

	deleteImage: async (parent, { id }, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		// delete the image
		await ctx.prisma.image.delete({ where: { id } })

		return { message: 'Image deleted' }
	},

	createReport: async (parent, { description, url, imageUrl }, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		// create a report
		const report = await ctx.prisma.report.create({
			data: {
				description,
				url,
				imageUrl,
			},
		})

		return report
	},

	deleteReport: async (parent, { id }, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		// delete the report
		await ctx.prisma.report.delete({ where: { id } })

		return { message: 'Report deleted' }
	},

	createProduct: async (parent, { categoryId }, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		return await ctx.prisma.product.create({
			data: categoryId
				? {
						categories: {
							connect: [
								{
									id: categoryId,
								},
							],
						},
				  }
				: {},
		})
	},

	deleteProduct: async (parent, { id }, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		// delete the product
		await ctx.prisma.product.delete({ where: { id } })

		return { message: 'Product deleted' }
	},

	updateProduct: async (parent, args, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		// delete all SKUs related to this product
		await ctx.prisma.sku.deleteMany({
			where: {
				product: {
					id: args.id,
				},
			},
		})

		// generate SKUs based on the provided info
		const Skus = args.skuData ? JSON.parse(args.skuData) : []

		const resp = await axios.get('https://api.exchangeratesapi.io/latest?symbols=USD,EUR,GBP&base=DKK')
		const conversionRates = resp.data.rates
		let hasMultiplePrices = false

		// Array.map doesn't respect await, causing concurrency issues
		// due to the fact that SQLLite gets locked
		// https://github.com/prisma/prisma/issues/484
		for (let i in Skus) {
			const entry = Skus[i]

			if (entry.price && entry.price !== args.price) {
				hasMultiplePrices = true
			}

			await ctx.prisma.sku.create({
				data: {
					sku: entry.sku.toUpperCase(),
					price: entry.price
						? {
								create: { ...makeMultiPrice(entry.price.DKK, conversionRates) },
						  }
						: undefined,
					product: {
						connect: {
							id: args.id,
						},
					},
					image: entry.image
						? {
								connect: {
									id: entry.image.id,
								},
						  }
						: undefined,
				},
			})
		}

		// clean up skuData
		delete args.skuData

		// sort images
		const images = args.images ? args.images : []

		// Array.map doesn't respect await, causing concurrency issues
		// due to the fact that SQLLite gets locked
		// https://github.com/prisma/prisma/issues/484
		for (let i in images) {
			await ctx.prisma.image.update({
				where: { id: images[i] },
				data: { sorting: parseInt(i, 10) + 1 },
			})
		}

		// take a copy of updates
		const updates = {
			...args,
			price: args.price
				? {
						create: { ...makeMultiPrice(args.price, conversionRates) },
				  }
				: undefined,
			hasMultiplePrices: hasMultiplePrices,
			code: args.code ? args.code.toUpperCase() : undefined,
			categories: {
				set:
					args.categories &&
					args.categories.map(cat => {
						return { id: cat }
					}),
			},
			images: {
				set:
					args.images &&
					args.images.map(id => {
						return { id }
					}),
			},
		}

		// remove the ID from the updates
		delete updates.id

		// run the update method
		return ctx.prisma.product.update({
			data: updates,
			where: {
				id: args.id,
			},
			include: {
				categories: true,
				price: true,
				images: true,
				skus: true,
			},
		})
	},

	createCategory: async (parent, args, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		return await ctx.prisma.category.create({ data: {} })
	},

	deleteCategory: async (parent, { id }, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		// delete the category
		await ctx.prisma.category.delete({ where: { id } })

		return { message: 'Category deleted' }
	},

	updateCategory: async (parent, args, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		// sort images
		if (args.images) {
			const images = args.images

			// Array.map doesn't respect await, causing concurrency issues
			// due to the fact that SQLLite gets locked
			// https://github.com/prisma/prisma/issues/484
			for (let i in images) {
				await ctx.prisma.image.update({
					where: { id: images[i] },
					data: { sorting: parseInt(i, 10) + 1 },
				})
			}
		}

		// take a copy of updates
		const updates = {
			...args,
		}

		// remove the ID from the updates
		delete updates.id

		if (args.images) {
			updates.images = {
				set:
					args.images &&
					args.images.map(id => {
						return { id }
					}),
			}
		}

		// run the update method
		return await ctx.prisma.category.update({
			data: updates,
			where: {
				id: args.id,
			},
			include: {
				products: true,
				images: {
					orderBy: [{ sorting: 'asc' }],
				},
			},
		})
	},

	sortCategories: async (parent, { categories }, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		// Array.map doesn't respect await, causing concurrency issues
		// due to the fact that SQLLite gets locked
		// https://github.com/prisma/prisma/issues/484
		for (let i in categories) {
			await ctx.prisma.category.update({
				where: { id: categories[i] },
				data: { sorting: parseInt(i, 10) + 1 },
			})
		}

		return {
			message: 'Categories sorted',
		}
	},

	updateCart: async (parent, { items }, ctx: Context, info) => {
		let cart = null
		let gottaRegenerateCookie = false

		const { cartToken } = ctx.request.cookies

		// if a cart cookies is found
		if (cartToken) {
			const { cartId } = jwt.verify(cartToken, process.env.APP_SECRET)

			// find cart to update
			cart = await ctx.prisma.cart.findOne({
				where: {
					id: cartId,
				},
			})

			if (!cart) {
				// clear the cookie to prevent future errors
				ctx.response.clearCookie('cartToken')
				gottaRegenerateCookie = true
			}

			if (cart) {
				// if a cart for this token existed, update it
				cart = await ctx.prisma.cart.update({
					where: {
						id: cart.id,
					},
					data: {
						items: items.join('|'),
					},
				})
			}
		}

		if (!cart) {
			gottaRegenerateCookie = true
			// create a new cart
			cart = await ctx.prisma.cart.create({
				data: {
					items: items.join('|'),
				},
			})
		}

		if (gottaRegenerateCookie) {
			// generate a JWT token for the cart
			const newCartToken = jwt.sign({ cartId: cart.id }, process.env.APP_SECRET)

			// set a cookie with that cart
			ctx.response.cookie('cartToken', newCartToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
			})
		}

		return cart
	},

	createOrder: async (parent, args, ctx: Context, info) => {
		let data = null

		const { cartToken } = ctx.request.cookies
		const { cartId } = jwt.verify(cartToken, process.env.APP_SECRET)

		try {
			// check if such a cart exists
			const cart = await ctx.prisma.cart.findOne({
				where: {
					id: cartId,
				},
			})

			// if it does, retrieve SKU data and parse items
			if (cart) {
				data = {
					...cart,
				}

				data.skus = await ctx.prisma.sku.findMany({
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
			} else {
				// no cart found
				throw new Error('Something went wrong processing your order [1]')
			}
		} catch (e) {
			// something broke
			throw new Error('Something went wrong processing your order [2]')
		}

		let purchasedSKUs = []
		let subtotal = 0

		data.items.split('|').map((sku, index) => {
			const skuData = data.skus.find(candidate => candidate.sku == sku)

			// add to subtotal
			subtotal += (skuData.price && skuData.price[args.currency]) || skuData.product.price[args.currency]

			const selectedAttributes = JSON.parse(skuData.product.selectedAttributes)
			const attributesInSku = Object.keys(selectedAttributes).filter(attribute => selectedAttributes[attribute].length)
			let variationInfo = {}
			attributesInSku.map((attribute, index) => {
				variationInfo[attribute] = skuData.sku.split('-')[index + 1]
			})

			// craft PurchasedSku
			const purchasedSku = {
				code: skuData.sku,
				name: skuData.product[`name_${args.locale}`],
				price: (skuData.price && skuData.price[args.currency]) || skuData.product.price[args.currency],
				currency: args.currency,
				image: (skuData.image && skuData.image.url) || skuData.product.images[0].url,
				variationInfo: JSON.stringify(variationInfo),
			}

			purchasedSKUs.push(purchasedSku)
		})

		let shippingCosts = []

		// ensure shipping is set to international if country is not DK
		if (args.country !== 'Denmark' && !args.shipping.includes('_international')) {
			throw new Error('Wrong shipping profile chosen')
		}

		// standard
		const shippingCost = await ctx.prisma.shippingProfile.findOne({
			where: {
				code: args.shipping,
			},
			include: {
				price: true,
			},
		})
		subtotal += shippingCost.price[args.currency] / 100
		shippingCosts.push({ code: args.shipping, price: shippingCost.price[args.currency] / 100 })

		// handle additional shipping costs
		if (args.shipping.includes('track_trace')) {
			// also include standard
			const standardShipping = await ctx.prisma.shippingProfile.findOne({
				where: {
					code: args.shipping.replace('track_trace', 'standard'),
				},
				include: {
					price: true,
				},
			})
			subtotal += standardShipping.price[args.currency] / 100
			shippingCosts.unshift({
				code: args.shipping.replace('track_trace', 'standard'),
				price: standardShipping.price[args.currency] / 100,
			})
		}

		// Stripe takes amounts in cents
		const total = parseInt('' + parseFloat('' + subtotal) * 100, 10) // IMPORTANT!!

		// create the Stripe charge
		const charge = await stripe(process.env.STRIPE_SECRET).charges.create({
			amount: total,
			currency: args.currency,
			source: args.token,
		})

		// create the Customer
		const customer = {
			email: args.email,
			name: args.name,
			address: args.address,
			address2: args.address2,
			city: args.city,
			zip: args.zip,
			country: args.country,
		}

		// create the Order
		const order = await ctx.prisma.order.create({
			data: {
				total, // in cents
				currency: args.currency,
				charge: charge.id,
				shipping: args.shipping,
				shippingCosts: JSON.stringify(shippingCosts),
				locale: args.locale,
				items: {
					create: purchasedSKUs,
				},
				customer: {
					create: customer,
				},
			},
			include: {
				customer: true,
				items: true,
			},
		})

		await ctx.prisma.customer.update({
			where: {
				id: order.customer.id,
			},
			data: {
				orders: {
					connect: {
						id: order.id,
					},
				},
			},
		})

		// clean up + delete cart
		await ctx.prisma.cart.delete({
			where: {
				id: cartId,
			},
		})
		ctx.response.clearCookie('cartToken')

		// send order confirmation mail
		sendConfirmationMail(order)

		// return the order to the client
		return order
	},

	markOrderAsShipped: async (parent, { id, trackingCode }, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])

		const data: { shippedAt: Date; trackingCode?: string } = {
			shippedAt: new Date(),
		}

		if (trackingCode) {
			data.trackingCode = trackingCode
		}

		// run the update method
		const order = await ctx.prisma.order.update({
			data,
			where: {
				id,
			},
			include: {
				customer: true,
				items: true,
			},
		})

		if (!order) throw new Error('Order not found')

		// send order confirmation mail
		sendShippingMail(order)

		return { message: 'Order marked as shipped' }
	},

	sendConfirmationMail: async (parent, { orderId }, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])
		// get the order
		const order = await ctx.prisma.order.findOne({
			where: {
				id: orderId,
			},
			include: {
				customer: true,
				items: true,
			},
		})
		if (!order) throw new Error('Order not found')

		// send order confirmation mail
		await sendConfirmationMail(order)

		return {
			message: 'Confirmation mail sent',
		}
	},

	sendOrderShippedMail: async (parent, { orderId }, ctx: Context, info) => {
		hasPermissions(ctx, ['ADMIN'])
		// get the order
		const order = await ctx.prisma.order.findOne({
			where: {
				id: orderId,
			},
			include: {
				customer: true,
				items: true,
			},
		})
		if (!order) throw new Error('Order not found')

		// send order confirmation mail
		await sendShippingMail(order)

		return {
			message: 'Confirmation mail sent',
		}
	},
}

export default mutationResolvers
