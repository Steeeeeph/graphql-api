// import {ApolloServer} from 'apollo-server';
// import gql from 'graphql-tag';

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
const { MONGODB_ATLAS } = require('./config.js');
const { reset } = require('nodemon');

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });

mongoose.connect(MONGODB_ATLAS, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    })