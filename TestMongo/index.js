var cors = require('cors');
const User = require('./models/User').User;
const database = require('./database/mongooseDb');
database.connectToDb();


// my function
var helloFn = function helloFn(req, res) {
    console.log('in hellofn');
    User.find()
        .then(records => {
            console.log('records', records);
            res.status(200)
                .send({result: true, records: records});
        });
};

// CORS and Cloud Functions export logic
exports.hello = function hello(req, res) {
    console.log('in hello');
    var corsFn = cors();
    corsFn(req, res, function () {
        console.log('in corsfn');
        helloFn(req, res);
    });
}

