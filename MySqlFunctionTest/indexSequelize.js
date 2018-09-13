
const cors = require('cors');
const Sequelize = require('sequelize');

const connectionName = process.env.DB_INSTANCE;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;


const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        socketPath: '/cloudsql/' +connectionName
    },
    pool: {
        max: 1,
        min: 0,
        acquire: 30000,
        idle: 10000
    },


    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: true
});

const Contacts = sequelize.define('contact', {
        Name: Sequelize.STRING(50),
        email: Sequelize.STRING(100),

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


const getRecords = function (req, res) {
    Contacts.findAll(
        {
            attributes: ['name', 'email']
        }).then((result) => {
        const records = [];
        result.forEach((record) => {
            records.push(record.dataValues);
        });
        console.log('records', records);
        res.status(200).send({success:true, records: records});
    }).catch(err=>{
        res.status(200).send({success:false, error: err});
    });
};

// CORS and Cloud Functions export logic
exports.testSQL = function testGetSql(req, res) {
    console.log('in test hello');
    var corsFn = cors();
    corsFn(req, res, function () {
        console.log('in corsfn');
        getRecords(req, res);
    });
}
