const connection = require('../dbconnection/initconnection').connection;
const Sequelize = require('sequelize');

const User = connection.define('user', {
        user: Sequelize.STRING(50),
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

/**
 * find user by user
 *
 *
 * @param user
 * @returns {Promise<void>}
 */
const findByUser = async (user)=>{
     return User.findOne({
        attributes: ['user', 'password'],
        where: {
            user: user
        }
    }).then((result) => {
        console.log('one record found',result.user);
        if(result.user){
            return { found: true,error:false,
                record: { user: result.user, passord: result.password}};
        } else{
            return { found: false,error:false, user: undefined};
        }
    });
}
module.exports.userDB ={
    User,
    findByUser
}