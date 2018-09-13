const config = {
    DB_SCHMEMA: "test_schema",
    DB_USER: "foo",
    DB_PASSWORD: "bar",
    sequelizeConfig: {
        host: '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 1,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

    }
}

module.exports = config;