const typeDefs = `
    type Permission {
        name: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        permissions: [Permission]
    }

    type Query { 
        users: [User]
    }

    type Mutation {
        createUser(
            name: String!
            email: String!
            password: String!
        ): User
    }
`

export default typeDefs