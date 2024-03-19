const { ApolloServer, AuthenticationError } = require('apollo-server');
const suppliersTypeDefs = require('./Suppliers/suppliersDefs.js');
const manufacturersTypeDefs = require('./Manufacturers/manufacturersDefs.js');
const distributorsTypeDefs = require('./Distributors/distributorsDefs.js'); // Import distributorsTypeDefs
const productsTypeDefs = require('./Products/productsDefs.js');
const suppliersResolvers = require('./Suppliers/suppliersResolvers.js');
const manufacturersResolvers = require('./Manufacturers/manufacturersResolvers.js');
const distributorsResolvers = require('./Distributors/distributorsResolvers.js');
const productsResolvers = require('./Products/productsResolvers.js');
const neo4j = require("neo4j-driver");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { createRateLimitDirective } = require('graphql-rate-limit');
dotenv.config();
// Neo4j connection details
const neo4jUrl = process.env.NEO4J_URL;
const neo4jUser = process.env.NEO4J_USER;
const neo4jPassword = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(
  neo4jUrl,
  neo4j.auth.basic(neo4jUser, neo4jPassword)
);

const server = new ApolloServer({
  typeDefs: [suppliersTypeDefs, manufacturersTypeDefs, distributorsTypeDefs, productsTypeDefs],
  resolvers: [suppliersResolvers, manufacturersResolvers, distributorsResolvers, productsResolvers],
  context: ({ req }) => {
    cors();

    const token = req.headers.authorization || '';

    try {
      if (req.body.operationName === "LoginUser" || req.body.operationName === "RegisterUser") {
        return { driver };
      }
      const expiresIn = 6;

      const user = jwt.verify(token, process.env.JWT_SECRET, { exp: Math.floor(Date.now() / 1000) + expiresIn });
      return { user, driver };
    } catch (err) {
      throw new AuthenticationError('Invalid or expired token');
    }
  },
  schemaDirectives: {
    rateLimit: createRateLimitDirective({
      identifyContext: (driver) => driver.user ? driver.user.id : '',
      formatError: (error) => {
        if (error.extensions.code === 'RATE_LIMITED') {
          return new Error('Too many requests, please try again later.');
        }
        return error;
      },
    }),
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});