//  needed to create user via:
// CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
// than grant privalages via tool

const Sequelize = require('sequelize');
const sequelize = new Sequelize('world', 'foo', 'bar', {
    host: '127.0.0.1',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },


    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: true
});

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});

const createUser = () => {
    sequelize.sync()
        .then(() => User.create({
            username: 'janedoe',
            birthday: new Date(1980, 6, 20)
        }))
        .then(jane => {
            console.log(jane.toJSON());
        });
}


/**
 *
 * CountryCode char(3) PK
 Language char(30) PK
 IsOfficial enum('T','F')
 Percentage float(4,1)
 * @type {Model}
 */

const CountryCode = sequelize.define('CountryLanguage', {
        CountryCode: Sequelize.STRING(3),
        Language: Sequelize.STRING(30),
        IsOfficial: Sequelize.ENUM('T', 'F'),
        Percentage: Sequelize.FLOAT(4, 1)
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

const findAllCountryCode = () => {
    CountryCode.findAll(
        {
            attributes: ['CountryCode', 'Language', 'IsOfficial', 'Percentage']
        }).then((result) => {
        const records  = [];
        result.forEach((record) => {
            records.push(record.dataValues);
        });
        console.log('records', records);
    });
}

findAllCountryCode();
