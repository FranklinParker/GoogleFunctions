const mysql = require('mysql');
const fs = require('fs');
const appConfig = require('./appconfig').localDB;
const Knex = require('knex');
const knex = connect();



function connect () {
    // [START connect]
    const config = {
        user: appConfig.DB_USER,
        password: appConfig.DB_PASSWORD,
        database: appConfig.DB_SCHMEMA,
        host:  appConfig.DB_URI,

    };
    console.log('knex', config);

    // Connect to the database
    const knex = Knex({
        client: 'mysql',
        connection: config
    });
    // [END connect]
    console.log('knex obj', knex);
    return knex;
}

// https://www.npmjs.com/package/knex
// https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/b967c6f61b5e9848b7105cb39b483058917357ca/appengine/cloudsql/server.js
const localTest = function (req, res) {
    console.log('local test of  knex');

    knex('city')
        .select('name')
        .orderBy('name', 'desc')
        .limit(10)
        .then((results) => {
            console.log('results', results);
        });


};

localTest()
  