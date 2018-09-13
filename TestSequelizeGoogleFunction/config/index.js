if (process.env.DB_URI) {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}