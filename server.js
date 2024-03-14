const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const { schema: suppliersDefs } = require('./Suppliers/suppliersDefs.js');
const { resolvers: suppliersResolvers } = require('./Suppliers/suppliersResolvers.js');

const { schema: manufacturersDefs } = require('./Manufacturers/manufacturersDefs.js');
const { resolvers: manufacturersResolvers } = require('./Manufacturers/manufacturersResolvers.js');

const { schema: distributorsDefs } = require('./Distributors/distributorsDefs.js');
const { resolvers: distributorsResolvers } = require('./Distributors/distributorsResolvers.js');

const { schema: productsDefs } = require('./Products/productsDefs.js');
const { resolvers: productsResolvers } = require('./Products/productsResolvers.js');

const jwt = require('jsonwebtoken');

const server = new ApolloServer({
  typeDefs: mergeTypeDefs([suppliersDefs, manufacturersDefs, distributorsDefs, productsDefs]),
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
