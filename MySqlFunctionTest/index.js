onst mysql = require('mysql2');

const connectionName = process.env.DB_INSTANCE;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const pool = mysql.createPool({
    connectionLimit : 1,
    socketPath: '/cloudsql/' + connectionName,
    user: dbUser,
    password: dbPass,
    database: dbName
});

exports.cloudSQLTest = (req, res) => {
    pool.query('SELECT NOW() AS now', (error, results, fields) => {
        console.log('query results');
        if(error){
            res.status(403).send('error testing db', error);
        }else{
            res.status(200).send(' query results', results);
        }
    });
};