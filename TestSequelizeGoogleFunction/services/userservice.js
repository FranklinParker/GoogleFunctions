const {findAllUsers, findUserByEmail, createUser} = require('../models/user').userDB;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_EXPIRES_SECONDS, JWT_SECRET} = require('../config');


/**
 * gets all users in the DB
 *
 * @returns {Promise<*>}
 */
const getAllUsers = async () => findAllUsers();


/**
 * register a user
 *
 *
 * @returns {Promise<{success: boolean, error: *}>}
 */
const register = async (requestData) => {
    const user = requestData.body;
    try {
        const result = await findUserByEmail(user.email);

        if (result.found) {
            console.log('result', result);
            return {success: false, message: 'cannot create user - exists'};
        } else {
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(user.password, salt);
            user.password = passwordHash;

            const result = await createUser(user);
            console.log('user created: ', result.dataValues);
            return {success: true, message: ' User created'};
        }


    } catch (err) {
        return {success: false, error: err};
    }

}
/**
 * login and confirm
 *
 *
 * @param reqParams
 * @returns {Promise<*>}
 */
const login = async (reqParams) => {
    const user = reqParams.body;
    const attributes = ['firstName', 'lastName', 'email', 'password'];
    const result = await findUserByEmail(user.email, attributes);
    if (result && result.found) {
        const isMatch = bcrypt.compareSync(user.password, result.record.password);
        if (isMatch) {
            const userRecord = result.record;
            userRecord.password=undefined;
            const token = jwt.sign({email: user.email},
                JWT_SECRET, {expiresIn: JWT_EXPIRES_SECONDS});
            return {
                success: true,
                record: userRecord,
                token: token,
                expiresInSeconds: JWT_EXPIRES_SECONDS
            }
        }else{
            return {success: false, message: 'Login failed'};
        }
    } else {
        return {success: false, message: 'Login failed'};
    }
}

module.exports = {
    register,
    getAllUsers,
    login

}