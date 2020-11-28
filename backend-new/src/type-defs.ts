const typeDefs = `
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

    type Query { 
        users: [User]
        currentUser: User
    }

    type Mutation {
        signUp(
            name: String!
            email: String!
            password: String!
        ): User!
        signOut: SuccessMessage
        signIn(
            email: String!, 
            password: String!
        ): User
    }
`

export default typeDefs
