import { Context } from '../index'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const mutationResolvers = {
    createUser: async (parent, args, ctx: Context, info) => {
        args.email = args.email.toLowerCase()
        // hash the passsword
        const password = await bcrypt.hash(args.password, 10)

        // create the user in the DB
        const user = await ctx.prisma.user.create({
            data: {
                name: args.name,
                email: args.email,
                password: args.password,
                permissions: {
                    connectOrCreate: {
                        where: { name: 'USER' }, create: {
                            name: "USER"
                        }
                    }
                },
            }
        })

        // create JWT token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
        // set the JWT as a cooke on the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        })

        // return the user to the browser
        return user
    }
}


export default mutationResolvers 