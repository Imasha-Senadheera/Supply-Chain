const { ApolloServer } = require('apollo-server');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');
const jwt = require('jsonwebtoken');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    try {
      const user = jwt.verify(token, 'secret-key');
      return { user };
    } catch (error) {
      return {};
    }
  },
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
