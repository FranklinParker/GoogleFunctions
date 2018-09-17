const authHeaderName = process.env.AUTH_HEADER_NAME || 'x-auth';

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
 *
 *
 * @param params
 */
const loginAuth = (params) => {
    console.log('login auth', params);
    const authHeader = params.headers[authHeaderName];
    console.log('authheader:' + authHeader);
    if (!authHeader || authHeader !== 'test') {
        throw new Error('not authenticated');
    }

}


module.exports = {
    loginAuth,
    checkIfAuthenticateRequired
}