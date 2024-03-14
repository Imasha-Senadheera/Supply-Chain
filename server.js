const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const { schema: suppliersSchema } = require('./suppliers/suppliersDefs');
const { resolvers: suppliersResolvers } = require('./suppliers/suppliersResolvers');

const { schema: manufacturersSchema } = require('./manufacturers/manufacturersDefs');
const { resolvers: manufacturersResolvers } = require('./Manufacturers/manufacturersResolvers');
const { schema: distributorsSchema } = require('./distributors/distributorsDefs');
const { resolvers: distributorsResolvers } = require('./distributors/distributorsResolvers');

const { schema: productsSchema } = require('./products/productsDefs');
const { resolvers: productsResolvers } = require('./products/productsResolvers');

const jwt = require('jsonwebtoken');

const server = new ApolloServer({
  typeDefs: mergeTypeDefs([suppliersSchema, manufacturersSchema, distributorsSchema, productsSchema]),
  resolvers: mergeResolvers([suppliersResolvers, manufacturersResolvers, distributorsResolvers, productsResolvers]),
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

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
