import typeDefs from './type-defs'
import { PrismaClient } from "@prisma/client"

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: 'variables.env' })

const { GraphQLServer } = require('graphql-yoga')

type Context = {
    prisma: PrismaClient
    request: any
    response: any
}

const resolvers = {
    Query: {
        tests: (parent, args, context: Context, info) => {
            console.log(context.request.userId)
            const tests = context.prisma.test.findMany()

            return tests
        }
    },
    Mutation: {
        createTest: (parent, args, context: Context, info) => {
            return context.prisma.test.create({
                data: {
                    name: args.name
                }
            })
        }
    },
}

const { makeExecutableSchema } = require('@graphql-tools/schema')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const prisma = new PrismaClient()

const server = new GraphQLServer({
    schema,
    context: (req) => ({ ...req, prisma }),
})

server.express.use(cookieParser())

// Decode the JWT so we can get the user ID on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies
    if (token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET)
        // put the user Id onto the req for future requests to access
        // console.log(`Token: ${token} -> ${userId}`)
        req.userId = userId
    }
    next()
})

const options = {
    port: 8000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
}
server.start(options, ({ port }) => console.log(`Server started, listening on port ${port} for incoming requests.`))
