const express = require('express')
import { PrismaClient } from '@prisma/client'
const { ApolloServer } = require('apollo-server-express')
import resolvers from './resolvers'
import typeDefs from './type-defs'

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: '.env' })

/*import * as fs from 'fs';
import * as path from 'path';
const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphql"), 'utf8')*/

export type Context = {
	prisma: PrismaClient
	req: any
	res: any
}

const prisma = new PrismaClient()

const app = express()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: req => ({ ...req, prisma }),
})

app.use(cookieParser())

// create a middleware that populates the user on each request
app.use(async (req, res, next) => {
	const { token } = req.cookies
	if (token) {
		const { userId } = jwt.verify(token, process.env.APP_SECRET)
		// put the user Id onto the req for future requests to access
		req.userId = userId
	}
	next()
})

app.use(async (req, res, next) => {
	// if they aren't logged in, skip this
	if (!req.userId) {
		req.user = null
		return next()
	}
	const user = await prisma.user.findUnique({
		where: { id: req.userId },
		include: {
			permissions: true,
		},
	})
	req.user = user
	next()
})

server.applyMiddleware({ app })
/*
const options = {
	port: process.env.PORT,
	endpoint: '/graphqlish',
	subscriptions: '/subscriptions',
	playground: '/playground',
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL,
	},
}
*/
app.listen({ port: process.env.PORT }, () =>
	console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
)
