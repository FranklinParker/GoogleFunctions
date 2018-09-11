//  needed to create user via:
// CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
// than grant privalages via tool
const appConfig = require('./loccalconfig');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(appConfig.DB_SCHMEMA, appConfig.DB_USER, appConfig.DB_PASSWORD, {
    host: appConfig.DB_URI,
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

/**
 department varchar(100)
 head_of_department varchar(60)
 head_of_department_email varchar(80)
 additional_approver varchar(60)
 additional_approver_email varchar(80)
 section_id tinyint(4)
 div_code varchar(5)
 */

const Department = sequelize.define('departments', {
        department: Sequelize.STRING(100),
        head_of_department: Sequelize.STRING(80),
        head_of_department_email: Sequelize.STRING(80)
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

const findAllDepartments = () => {
    Department.findAll(
        {
            attributes: ['department', 'head_of_department', 'head_of_department_email']
        }).then((result) => {
        const records  = [];
        result.forEach((record) => {
            records.push(record.dataValues);
        });
        console.log('records', records);
    });
}

findAllDepartments();
