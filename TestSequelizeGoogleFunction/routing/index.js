const {getContacts} = require('../services/contactservice');
const {getAllUsers, register, login} = require('../services/userservice');
const {checkIfAuthenticateRequired, loginAuth} = require('../auth');


const processRouteMap = {
    '/getContacts': {
        authMethods: [loginAuth],
        processMethod: getContacts
    },
    '/register': {
        processMethod: register,
    },
    '/login': {
        processMethod: login
    },
    '/users': {
        authMethods: [loginAuth],
        processMethod: getAllUsers
    }

};


/**
 * remove any query params out of key
 *
 *
 * @param url
 * @returns {string}
 */
const getBaseUrl = (url) => {
    const idx = url.indexOf('?');
    return idx > -1 ? url.substr(0, idx) : url;

}

/**
 * process request handler
 *
 *
 * @param key
 * @param params
 * @returns {Promise<*>}
 */

const process = async (key, params) => {
    try {
        key = getBaseUrl(key);
        const processObject = processRouteMap[key];
        if (!processObject || !processObject.processMethod) {
            return {success: false, message: `No Route handler for route ${key}`}
        }
        checkIfAuthenticateRequired(params, processObject.authMethods);
        return await processObject.processMethod(params);

    } catch (e) {
        return {success: false, message: e.message};
    }

}

module.exports = {
    process
}