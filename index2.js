const { ApolloServer, gql } = require("apollo-server");

// Schema definition
const typeDefs = gql`
  type Query {
    hello: String
    welcome(name: String): String
  }

  type Mutation {
    reverse(text: String): String
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    welcome: (_, { name }) => `Welcome, ${name || "Guest"}!`,
  },
  Mutation: {
    reverse: (_, { text }) => text.split("").reverse().join(""),
  },
};

// Creating the server
const server = new ApolloServer({ typeDefs, resolvers });

// Starting the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
