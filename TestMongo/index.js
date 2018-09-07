var cors = require('cors');
const mongoose = require('mongoose');
connectToDb();

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    roles: [{type: String}]
});

const User = mongoose.model('User', UserSchema);

// my function
var helloFn = function helloFn(req, res) {
    User.find()
        .then(records=>{
            res.status(200)
                .send({result:true, records: records});
        });


};

// CORS and Cloud Functions export logic
exports.hello = function hello(req, res) {
    var corsFn = cors();
    corsFn(req, res, function() {
        helloFn(req, res);
    });
}


function connectToDb() {
    const promiseLib = global.Promise;
    mongoose.Promise = global.Promise;
    const mongoDB = mongoose.connect(process.env.DB_URL, {
        promiseLibrary: promiseLib // Deprecation issue again
    });
    mongoDB
        .then(function (db) {
            console.log('Mongodb has been connected ');
        }).catch(function (err) {
        console.log('Error while trying to connect with mongodb');
        throw err;
    });
}