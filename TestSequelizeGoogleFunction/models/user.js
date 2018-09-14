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
        lastName:  Sequelize.STRING(45),
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
const findUserByEmail = async (email) => {
    console.log('find by :')
    try {
        return User.findOne({
            attributes: ['firstName', 'lastName','email'],
            where: {
                email: email
            }
        }).then((result) => {
            console.log('one record found', result);
            if (result && result.email) {
                return {
                    found: true, error: false,
                    record: {
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName
                    }
                };
            } else {
                return {found: false, error: false, user: undefined};
            }
        });
    } catch (err) {
        return {found: false, error: true, message: err};
    }

}

const createUser = async  (user) =>{
    const result =  User.create(user);
    return result;
}

module.exports.userDB = {
    User,
    findUserByEmail,
    createUser
}