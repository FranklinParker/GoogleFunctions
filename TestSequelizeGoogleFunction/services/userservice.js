const {findAllUsers, findUserByEmail, createUser} = require('../models/user').userDB;

const bcrypt = require('bcryptjs');


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

module.exports = {
  register,
  getAllUsers

}