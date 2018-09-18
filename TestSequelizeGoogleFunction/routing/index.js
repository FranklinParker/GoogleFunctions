const {getContacts, createNewContact, updateContact} = require('../services/contactservice');
const {getAllUsers, register, login} = require('../services/userservice');
const {checkIfAuthenticateRequired, loginAuth} = require('../auth');


const processRouteMap = {
    '/contacts': {
        'GET': {
            authMethods: [loginAuth],
            processMethod: getContacts
        },
        'POST':{
            authMethods: [loginAuth],
            processMethod: createNewContact
        },
        'PUT':{
            authMethods: [loginAuth],
            processMethod: updateContact
        }
    },
    '/user':{
        'GET': {
            authMethods: [loginAuth],
            processMethod: getAllUsers
        },
        'POST':{
            processMethod: register
        }

    },
    '/auth':{

        'POST':{
            processMethod: login
        }

    }

}

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
        console.log(params);
        const method =  params.query.$method;
        const processObject = processRouteMap[key];
        console.log('processObject', processObject);
        if (!processObject || !processObject[method]) {
            return {success: false, message: `No Route handler for route ${key}.${method}`}
        }
        checkIfAuthenticateRequired(params, processObject.authMethods);
        console.log('process after auth check - params', params);

        return await processObject[method].processMethod(params);

    } catch (e) {
        return {success: false, message: e.message};
    }

}

module.exports = {
    process
}