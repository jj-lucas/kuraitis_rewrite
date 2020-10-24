const jwt = require('jsonwebtoken')
const { forwardTo } = require('prisma-binding')
const hasPermissions = require('../lib/hasPermissions')
const stripe = require('../stripe')

const mutations = {
	...require('./mutations/user'),
	...require('./mutations/category'),
	...require('./mutations/product'),
	...require('./mutations/image'),

	// REPORT
	async createReport(parent, args, ctx, info) {
		hasPermissions(ctx, ['ADMIN', 'REPORTCREATE'])

		return await ctx.db.mutation.createReport(
			{
				data: {
					...args,
				},
			},
			info
		)
	},
	async deleteReport(parent, args, ctx, info) {
		hasPermissions(ctx, ['ADMIN', 'REPORTRESOLVE'])

		const where = { id: args.id }
		return ctx.db.mutation.deleteReport({ where }, info)
	},

	// SKU
	createSKU: forwardTo('db'),
	updateSKU: forwardTo('db'),

	// Cart
	async updateCart(parent, args, ctx, info) {
		let cart = null
		let gottaRegenerateCookie = false

		// if a cart ID is provided
		if (args.id) {
			// find cart to update
			cart = await ctx.db.query.cart(
				{
					where: {
						id: args.id,
					},
				},
				info
			)
			if (!cart) {
				// clear the cookie to prevent future errors
				ctx.response.clearCookie('cartToken')
				gottaRegenerateCookie = true
			}
			if (cart) {
				// if a cart for this ID existed, update it
				cart = await ctx.db.mutation.updateCart(
					{
						where: {
							id: cart.id,
						},
						data: {
							items: args.items.join('|'),
						},
					},
					info
				)
			}
		}

		if (!cart) {
			gottaRegenerateCookie = true
			// create a new cart
			cart = await ctx.db.mutation.createCart(
				{
					data: {
						items: args.items.join('|'),
					},
				},
				info
			)
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

	// Order
	async createOrder(parent, args, ctx, info) {
		let data = null

		try {
			// check if such a cart exists
			const cart = await ctx.db.query.cart(
				{
					where: {
						id: args.cartId,
					},
				},
				`{ id items }`
			)

			// if it does, retrieve SKU data and parse items
			if (cart) {
				data = {
					...cart,
				}

				data.skus = await ctx.db.query.sKUs(
					{
						where: {
							sku_in: cart.items.split('|'),
						},
					},
					`{
          id
          sku
          price {
            DKK
            USD
            EUR
            GBP
          }
          product {
            price {
              DKK
              USD
              EUR
              GBP
            }
            images {
              image
            }
            name_da
            name_en
            selectedAttributes
          }
          image {
            image
          }
        }`
				)
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

		console.log(data.items)
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
				image: (skuData.image && skuData.image.image) || skuData.product.images[0].image,
				variationInfo: JSON.stringify(variationInfo),
			}

			purchasedSKUs.push(purchasedSku)
		})

		// handle shipping costs
		if (args.shipping === 'track_trace') {
			subtotal += 40
		}

		// Stripe takes amounts in cents
		const total = subtotal * 100 // IMPORTANT!!

		// create the Stripe charge
		const charge = await stripe.charges.create({
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
		const order = await ctx.db.mutation.createOrder(
			{
				data: {
					total, // in cents
					currency: args.currency,
					charge: charge.id,
					shipping: args.shipping,
					items: {
						create: purchasedSKUs,
					},
					customer: {
						create: customer,
					},
				},
			},
			`{ 
      id
      customer {
        id
      }
    }`
		)

		console.log(JSON.stringify(order))

		await ctx.db.mutation.updateCustomer({
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
		await ctx.db.mutation.deleteCart({
			where: {
				id: args.cartId,
			},
		})
		ctx.response.clearCookie('cartToken')

		// return the order to the client
		return order
	},
}

module.exports = mutations
