const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Permission {
		name: String!
	}

	type SuccessMessage {
		message: String
	}

	type User {
		id: ID!
		name: String!
		email: String!
		permissions: [Permission]
	}

	type ProductImage {
		id: ID!
		mainUrl: String!
		adminUrl: String!
		galleryUrl: String!
		cartUrl: String!
		thumbUrl: String!
		sorting: Int
		categoryId: String
		productId: String
		skuId: String
	}

	type CategoryImage {
		id: ID!
		thumbUrl: String!
		adminUrl: String!
		sorting: Int
		categoryId: String
		productId: String
		skuId: String
	}

	type Report {
		id: ID!
		createdAt: String!
		resolvedAt: String
		description: String!
		url: String!
		imageUrl: String!
	}

	type Sku {
		id: ID!
		sku: String!
		product: Product!
		price: Price
		image: ProductImage
		stock: Int
	}

	type CartSku {
		id: ID!
		sku: Sku!
		customization: String
	}

	type Product {
		id: ID!
		code: String
		customizable: Boolean!
		price: Price
		hasMultiplePrices: Boolean!
		sorting: Int
		published: Boolean!
		categories: [Category]
		images: [ProductImage]
		skus: [Sku]
		selectedAttributes: String
		slug_da: String
		slug_en: String
		name_da: String
		name_en: String
		description_da: String
		description_en: String
	}

	type Price {
		id: ID!
		DKK: Int
		USD: Int
		EUR: Int
		GBP: Int
	}

	type Category {
		id: ID!
		sorting: Int
		published: Boolean!
		products: [Product]
		images: [CategoryImage]
		slug_da: String
		slug_en: String
		name_da: String
		name_en: String
		description_da: String
		description_en: String
	}

	type Attribute {
		id: ID!
		name: String
		options: String
		position: Int
	}

	type ShippingProfile {
		id: ID!
		code: String
		price: Price
	}

	type Cart {
		id: ID!
		cartSkus: [CartSku]
	}

	type Order {
		id: ID!
		number: Int
		createdAt: String!
		items: [PurchasedSku]!
		shipping: String!
		shippingCosts: String!
		total: Int!
		currency: String!
		charge: String!
		customer: Customer!
		shippedAt: String
		archived: Boolean!
		trackingCode: String
		auth: String
		customerId: String
		locale: String
		comment: String
	}

	type Customer {
		id: ID!
		createdAt: String!
		email: String!
		name: String!
		address: String!
		address2: String
		city: String!
		zip: String!
		country: String!
		orders: [Order]
	}

	type PurchasedSku {
		id: ID!
		code: String!
		name: String!
		price: Int!
		currency: String!
		image: String!
		variationInfo: String!
		customization: String
	}

	type Quote {
		message: String!
		creation_tsz: String!
	}

	type Query {
		quote: Quote

		users: [User]
		currentUser: User

		reports: [Report]

		products(categorySlug: String): [Product]
		product(id: ID, code: String): Product

		attributes: [Attribute]

		shippingProfiles: [ShippingProfile]

		categories: [Category]
		category(id: ID, slug_da: String, slug_en: String): Category

		cart: Cart

		order(id: ID!): Order
		orders: [Order]
	}

	type Mutation {
		signUp(name: String!, email: String!, password: String!): User!
		signOut: SuccessMessage
		signIn(email: String!, password: String!): User

		createProductImage(
			mainUrl: String!
			thumbUrl: String!
			adminUrl: String!
			cartUrl: String!
			galleryUrl: String!
			productId: ID
		): ProductImage!
		createCategoryImage(thumbUrl: String!, adminUrl: String!, categoryId: ID): CategoryImage!
		deleteImage(id: ID!): SuccessMessage

		createReport(description: String!, url: String!, imageUrl: String!): Report
		deleteReport(id: ID!): SuccessMessage

		createProduct(categoryId: ID): Product
		deleteProduct(id: ID!): SuccessMessage
		updateProduct(
			id: ID!
			code: String
			customizable: Boolean
			price: Int
			published: Boolean
			categories: [ID]
			images: [ID]
			skuData: String
			selectedAttributes: String
			slug_da: String
			slug_en: String
			name_da: String
			name_en: String
			description_da: String
			description_en: String
		): Product
		sortProducts(products: [ID]): SuccessMessage

		createCategory: Category
		deleteCategory(id: ID!): SuccessMessage
		updateCategory(
			id: ID!
			published: Boolean
			images: [ID]
			slug_da: String
			slug_en: String
			name_da: String
			name_en: String
			description_da: String
			description_en: String
		): Category
		sortCategories(categories: [ID]): SuccessMessage

		addToCart(sku: String!, customization: String): Cart!
		removeFromCart(id: ID!): Cart!

		createOrder(
			token: String!
			currency: String!
			locale: String!
			email: String!
			name: String!
			address: String!
			address2: String
			city: String!
			zip: String!
			country: String!
			shipping: String!
			comment: String
		): Order

		markOrderAsShipped(id: String!, trackingCode: String): SuccessMessage

		sendConfirmationMail(orderId: String!): SuccessMessage

		sendOrderShippedMail(orderId: String!): SuccessMessage

		previewMail(orderId: String!, type: String!): SuccessMessage
	}
`

export default typeDefs
