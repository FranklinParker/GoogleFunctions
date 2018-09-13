const Sequelize = require('sequelize');
const connection = new Sequelize('test_schema', 'foo', 'bar', {
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


module.exports = {
    connection
}