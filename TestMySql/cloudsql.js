var fs = require('fs');
var Sequelize = require('sequelize');
console.log('dir name'+ __dirname);
const certDir = __dirname + '/cert/'
var sequelize = new Sequelize('schema', 'user', 'password', {
    host: 'googlecloudUrl',
    dialect: 'mysql',
    ssl: {
        ca: fs.readFileSync(certDir + '/server-ca.pem'),
        cert: fs.readFileSync(certDir+ '/client-cert.pem'),
        key: fs.readFileSync(certDir+ '/client-key.pem')
    }
});
sequelize.query('select * from table').then(function (records) {
    console.log(records);
});