if (process.env.DB_INSTANCE) {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}