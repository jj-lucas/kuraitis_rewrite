const typeDefs = `
    type Test {
        id: ID!
        name: String!
    }

    type Query {
        tests: [Test]
    }

    type Mutation {
        createTest(
            name: String!
        ): Test
    }
`

export default typeDefs