const mysql = require('mysql');

const connectionName = process.env.DB_INSTANCE;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;


const config = {
    connectionLimit : 1,
    socketPath: '/cloudsql/' + connectionName,
    user: dbUser,
    password: dbPass,
    database: dbName
};

console.log('DBConfig:', config);
const pool = mysql.createPool(config);

exports.cloudSQLTest = function (req, res) {
    pool.query('SELECT NOW() AS now', (error, results, fields) => {
        console.log('query results');
        if(error){
             res.status(200).send('error testing db', error);
        }else{
            res.status(200).send(' query results', results);
        }
    });
};