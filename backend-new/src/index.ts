import typeDefs from './type-defs'
import { PrismaClient } from "@prisma/client"

const { GraphQLServer } = require('graphql-yoga')

const { makeExecutableSchema } = require('@graphql-tools/schema')

const prisma = new PrismaClient()

type Context = {
    prisma: PrismaClient
}

const context = {
    prisma,
}

const resolvers = {
    Query: {
        tests: (parent, args, context: Context, info) => {
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


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const server = new GraphQLServer({
    schema,
    context,
})

const options = {
    port: 8000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
}
server.start(options, ({ port }) => console.log(`Server started, listening on port ${port} for incoming requests.`))
