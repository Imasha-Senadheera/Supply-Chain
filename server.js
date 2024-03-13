const { ApolloServer } = require('apollo-server');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');
const { validateQueryDepth, createComplexityLimitRule } = require('graphql-validation-complexity');
const jwt = require('jsonwebtoken');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  validationRules: [validateQueryDepth(5), createComplexityLimitRule(1000)],
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

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
