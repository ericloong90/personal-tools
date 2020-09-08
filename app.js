const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { applyMiddleware } = require('graphql-middleware');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const dataSources = require('./dataSources');

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
);

const server = new ApolloServer({
  schema,
  cors: true,
  dataSources,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is listening at ${url}`);
});
