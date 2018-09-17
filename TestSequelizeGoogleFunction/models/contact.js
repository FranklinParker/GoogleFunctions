const connection = require('../dbconnection/initconnection').connection;
const Sequelize = require('sequelize');

const Contact = connection.define('contact', {
        firstName: Sequelize.STRING(50),
        lastName: Sequelize.STRING(50),
        email: Sequelize.STRING(100),
        address: Sequelize.STRING(50),
        city: Sequelize.STRING(50),
        state: Sequelize.STRING(50),
        zip: Sequelize.STRING(50),

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



module.exports.contactDB ={
    Contact
}