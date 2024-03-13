const neo4j = require('neo4j-driver');

// Neo4j database connection details
const uri = 'bolt://localhost:7687';
const username = 'neo4j';
const password = 'Imasha@0326';

// Create Neo4j driver instance
const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

module.exports = { driver };
