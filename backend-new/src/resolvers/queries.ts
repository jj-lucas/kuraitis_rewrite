import { Context } from '../index'

const queryResolvers = {
    tests: (parent, args, context: Context, info) => {
        // console.log(context.request.userId)
        const tests = context.prisma.test.findMany()

        return tests
    },

    testUsers: (parent, args, context: Context, info) => {
        return context.prisma.testUser.findMany()
    },

    users: async (parent, args, ctx: Context, info) => {
        return ctx.prisma.user.findMany({
            include: {
                permissions: true
            }
        })
    }
}

export default queryResolvers 