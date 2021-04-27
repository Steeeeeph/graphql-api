// import {ApolloServer} from 'apollo-server';
// import gql from 'graphql-tag';

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
// const { reset } = require('nodemon');
dotenv.config();

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });

mongoose.connect(process.env.NODE_MONGODB_ATLAS, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: process.env.PORT || 4000 })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });