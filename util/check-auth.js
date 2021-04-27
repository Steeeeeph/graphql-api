const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (context) => {
    // context = {...headers}
    const authHeader = context.req.headers.authorization;
    //  when authHeader is there, we need to get the token of it
    if (authHeader) {
        // convention of authorization : we send this header with a value of 'Bearer <token>', token is the second string after split so [1]
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.NODE_SECRET_KEY);
                return user;
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer <token>\'');
    }
    throw new Error('Authorization header must be provided');
};