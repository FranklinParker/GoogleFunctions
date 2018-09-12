const mysql = require('mysql');
const cors = require('cors');

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

const getRecords = function (req, res) {
    pool.query('SELECT NOW() AS now', (error, results, fields) => {
        console.log('query results', results);
        console.log('query error', error);
        if(error){
            res.status(200).send({success:false, error:'error testing db:' + error});
        }else{
            res.status(200).send({success:true, results: results});
        }
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
