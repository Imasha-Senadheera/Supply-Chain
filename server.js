const { ApolloServer, gql } = require('apollo-server');

const suppliersResolvers = require('./Suppliers/suppliersResolvers.js');
const manufacturersResolvers = require('./Manufacturers/manufacturersResolvers.js');
const distributorsResolvers = require('./Distributors/distributorsResolvers.js');
const productsResolvers = require('./Products/productsResolvers.js');

const suppliersTypeDefs = require('./Suppliers/suppliersDefs.js');
const manufacturersTypeDefs = require('./Manufacturers/manufacturersDefs.js');
const distributorsTypeDefs = require('./Distributors/distributorsDefs.js');
const productsTypeDefs = require('./Products/productsDefs.js');

const mergedTypeDefs = gql`
  ${suppliersTypeDefs}
  ${manufacturersTypeDefs}
  ${distributorsTypeDefs}
  ${productsTypeDefs}
`;

const mergedResolvers = [
  suppliersResolvers,
  manufacturersResolvers,
  distributorsResolvers,
  productsResolvers,
];

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  context: ({ req }) => {
    // You can add your authentication logic here if needed
    const token = req.headers.authorization || '';
    try {
      // Example JWT verification, replace with your actual authentication logic
      // const user = jwt.verify(token, 'secret-key');
      // return { user };
      return {};
    } catch (error) {
      return {};
    }
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
