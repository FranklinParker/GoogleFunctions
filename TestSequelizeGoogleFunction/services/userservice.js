const { User, findByUser, createUser} = require('../models/user').userDB;


/**
 * register a user
 *
 *
 * @returns {Promise<{success: boolean, error: *}>}
 */
const register =  async (user, password) =>{
    try{
        const result = await findByUser(user);

        if(result.found){
            return result;
        }else{
            return createUser(user,password);
        }


    } catch(err){
        return {success: false, error: err};
    }

}

module.exports = {
    register

}