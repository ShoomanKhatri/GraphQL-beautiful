const { ApolloServer, gql } = require("apollo-server");

// In-memory data store
let todos = [];

// Schema definition
const typeDefs = gql`
  type Todo {
    id: ID!
    task: String!
    completed: Boolean!
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    addTodo(task: String!): Todo
    removeTodo(id: ID!): Boolean
    toggleTodo(id: ID!): Todo
  }
`;

// Resolvers
const resolvers = {
  Query: {
    getTodos: () => todos,
  },
  Mutation: {
    addTodo: (_, { task }) => {
      const newTodo = { id: `${todos.length + 1}`, task, completed: false };
      todos.push(newTodo);
      return newTodo;
    },
    removeTodo: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index > -1) {
        todos.splice(index, 1);
        return true;
      }
      return false;
    },
    toggleTodo: (_, { id }) => {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        return todo;
      }
      return null;
    },
  },
};

// Creating the server
const server = new ApolloServer({ typeDefs, resolvers });

// Starting the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
