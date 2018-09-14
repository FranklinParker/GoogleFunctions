const {   findUserByEmail, createUser} = require('../models/user').userDB;

const bcrypt = require('bcryptjs');

/**
 * register a user
 *
 *
 * @returns {Promise<{success: boolean, error: *}>}
 */
const register =  async (firstName, lastName,email, password) =>{
    try{
        const result = await findUserByEmail(email);

        if(result.found){
            console.log('result', result);
            return { success: false, message: 'cannot create user - exists'};
        }else{
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);
            const  user = {
                firstName,
                lastName,
                email,
                password: passwordHash
            }
            const result = await createUser(user);
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