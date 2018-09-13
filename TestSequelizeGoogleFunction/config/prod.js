/**
 *
 *
 const connectionName = process.env.DB_INSTANCE;
 const dbUser = process.env.DB_USER;
 const dbPass = process.env.DB_PASSWORD;
 const dbName = process.env.DB_NAME;

 * @type {{DB_SCHMEMA: string, DB_USER: string, DB_PASSWORD: string, sequelizeConfig: {host: string, dialect: string, dialectOptions: {socketPath: string}, pool: {pool: {max: number, min: number, acquire: number, idle: number}}}}}
 */

const config = {
    DB_SCHMEMA: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
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