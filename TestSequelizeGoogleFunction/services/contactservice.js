
const Sequelize = require('sequelize');
const sequelize = new Sequelize('test_schema', 'foo', 'bar', {
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



const getContacts = (callback)=>{
    Contacts.findAll(
        {
            attributes: ['name', 'email']
        }).then((result) => {
        const records = [];
        result.forEach((record) => {
            records.push(record.dataValues);
        });
        console.log('records', records);
        callback({success:true, records: records});
    }).catch(err=>{
        callback({success:false, error: err});
    });

}

module.exports = {
    getContacts
}