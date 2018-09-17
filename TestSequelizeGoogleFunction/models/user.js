const connection = require('../dbconnection/initconnection').connection;
const Sequelize = require('sequelize');
/**
 * CREATE TABLE `test_schema`.`user` (
 `email` VARCHAR(100) NULL,
 `firstName` VARCHAR(45) NULL,
 `lastName` VARCHAR(45) NULL,
 `password` VARCHAR(100) NULL);

 * @type {Model}
 */
const User = connection.define('user', {
    firstName: Sequelize.STRING(45),
    lastName: Sequelize.STRING(45),
    email: Sequelize.STRING(100),
    password: Sequelize.STRING(100),

  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    //   underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true

    // define the table's name
    // tableName: 'my_very_custom_table_name'
  });

User.removeAttribute('id');

/**
 * find user by user
 *
 *
 * @param user
 * @returns {Promise<void>}
 */
const findUserByEmail = async (email, attributes) => {
  const queryFields = attributes ? attributes:
      ['firstName', 'lastName', 'email'];
  try {
    return User.findOne({
      attributes: queryFields,
      where: {
        email: email
      }
    }).then((result) => {
      if (result) {
        return {
          found: true, error: false,
          record: result.dataValues
        };
      } else {
        return {found: false, error: false, record: undefined};
      }
    });
  } catch (err) {
    return {found: false, error: true, message: err.message};
  }

}


/**
 * find all users
 *
 *
 * @param user
 * @returns {Promise<void>}
 */
const findAllUsers = async () => {
  console.log('find by :')
  try {
    return User.findAll({
      attributes: ['firstName', 'lastName', 'email']

    }).then((result) => {
      if (result) {
        const users = [];
        result.forEach((user) => {
          users.push(user.dataValues);
        });

        return {
          found: true, error: false,
          records: users
        };
      } else {
        return {found: false, error: false, user: undefined};
      }
    });
  } catch (err) {
    return {found: false, error: true, message: err};
  }

}

const createUser = async (user) => {
  const result = User.create(user);
  return result;
}

module.exports.userDB = {
  User,
  findUserByEmail,
  findAllUsers,
  createUser
}