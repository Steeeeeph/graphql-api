const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');


module.exports = {
    // Post (use the type of the schema) modifier, when any mutation returns it will be firstly modified
    Post: {
        likeCount: (parent) => {
            return parent.likes.length;
        },
        commentCount: (parent) => {
            return parent.comments.length;
        }
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
};