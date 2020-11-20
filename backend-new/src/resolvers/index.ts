import queryResolvers from './queries'
import mutationResolvers from './mutations'
import { Context } from '../index'

const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
}

export default resolvers