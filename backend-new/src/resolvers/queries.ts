import { Context } from '../index'

const queryResolvers = {
    users: async (parent, args, ctx: Context, info) => {
        return ctx.prisma.user.findMany({
            include: {
                permissions: true
            }
        })
    }
}

export default queryResolvers 