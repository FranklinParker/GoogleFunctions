

const config = {
    DB_SCHMEMA: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_SECONDS:process.env.JWT_EXPIRES_SECONDS,
    sequelizeConfig: {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            socketPath: '/cloudsql/' + process.env.DB_INSTANCE
        },
        pool: {
            pool: {
                max: 1,
                min: 0,
                acquire: 30000,
                idle: 10000
            },

        }
    }
}
module.exports = config;