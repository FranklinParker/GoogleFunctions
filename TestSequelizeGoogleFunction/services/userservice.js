const { User, findByUser} = require('../models/user').userDB;


/**
 * register a user
 *
 *
 * @returns {Promise<{success: boolean, error: *}>}
 */
const register =  async (user, password) =>{
    try{
        const result = await findByUser(user);

        return result;

    } catch(err){
        return {success: false, error: err};
    }

}

module.exports = {
    register

}