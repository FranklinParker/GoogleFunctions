const {getContacts} = require('../services/contactservice');
const { getAllUsers,register } = require('../services/userservice');
const { checkIfAuthenticateRequired, loginAuth} = require('../auth');


const processRouteMap = {
  '/getContacts': {
    authMethods: [loginAuth],
    processMethod: getContacts
  },
  '/register': {
    processMethod: register
  },
  '/users': {
    processMethod: getAllUsers
  }

};


/**
 * process request handler
 *
 *
 * @param key
 * @param params
 * @returns {Promise<*>}
 */

const process = async (key, params)=>{
  try{
    const processObject  = processRouteMap[key];
    if(!processObject || !processObject.processMethod){
      return { success: false, message: `No Route handler for route ${key}`}
    }
    checkIfAuthenticateRequired(params, processObject.authMethods);
    return await processObject.processMethod(params);

  }catch (e){
    return { success: false, message: e.message};
  }

}

module.exports ={
  process
}