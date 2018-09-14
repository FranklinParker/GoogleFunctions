const { User, findByUser, createUser} = require('../models/user').userDB;

const bcrypt = require('bcryptjs');

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
            return { success: false, message: 'cannot create user - exists'};
        }else{
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);
            const result = await createUser(user,passwordHash);
            console.log('user created: ', result.dataValues);
            return { success: true, message: ' User created'};
        }


    } catch(err){
        return {success: false, error: err};
    }

}

module.exports = {
    register

}