const typeDefs = `
    type TestUser {
        id: ID!
        name: String
        test: [Test]
    }
    type Test {
        id: ID!
        name: String!
    }

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
        tests: [Test]
        testUsers: [TestUser]

        users: [User]
    }

    type Mutation {
        createTest(
            name: String!
        ): Test
        createUser(
            name: String!
            email: String!
            password: String!
        ): User
    }
`

export default typeDefs