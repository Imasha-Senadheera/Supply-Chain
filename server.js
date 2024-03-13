const { ApolloServer } = require('apollo-server');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
