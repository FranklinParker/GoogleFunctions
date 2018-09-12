const mysql = require('mysql');
const config = require('./appconfig').CloudDB;
const fs = require('fs');
console.log(config);

const certDir = __dirname + '/cert/'

const pool = mysql.createPool({
    connectionLimit: 1,
    host: config.DB_URI,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_SCHMEMA,
    ssl: {
        ca: fs.readFileSync(certDir + '/server-ca.pem'),
        cert: fs.readFileSync(certDir+ '/client-cert.pem'),
        key: fs.readFileSync(certDir+ '/client-key.pem')
    }
});


pool.query('SELECT NOW() AS now', (error, results, fields) => {
    console.log('query results');
    if (error) {
        console.log('error testing db', error);
    } else {
        console.log(' query results', results);
    }
});
