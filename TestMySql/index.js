//  needed to create user via:
// CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
// than grant privalages via tool

const Sequelize = require('sequelize');
const sequelize = new Sequelize('world', 'foo','bar', {
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

sequelize.sync()
    .then(() => User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    }))
    .then(jane => {
        console.log(jane.toJSON());
    });