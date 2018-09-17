const authHeaderName = process.env.AUTH_HEADER_NAME || 'x-auth';
const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');

/**
 * if auth methods exists confirm required info exists
 *
 * @param params
 * @param authMethods
 */
const checkIfAuthenticateRequired = (params, authMethods) => {

    if (!authMethods) {
        return;
    }
    try {
        authMethods.forEach(authMethod => authMethod(params))
    } catch (e) {
        throw e;
    }
}
/**
 * makes sure there is a valid token
 *
 * @param params
 */
const loginAuth = (params) => {
    const authHeader = params.headers[authHeaderName];
    if (!authHeader) {
        throw new Error('not authenticated');
    }
    try {
        const decodedToken = jwt.verify(authHeader, JWT_SECRET);
        params.userData = {email: decodedToken.email};

    }
    catch (e) {
        console.log(e);
        throw new Error('Not authenticated');
    }


}

module.exports = {
    loginAuth,
    checkIfAuthenticateRequired
}