const dotenv = require('dotenv');
dotenv.config();

// si on est en mode dev
if (process.env.ENV == "DEV") {
    MONGO_HOST = process.env.MONGO_HOST_DEV
    MONGO_PORT = process.env.MONGO_PORT_DEV
    MONGO_USER = process.env.MONGO_USER_DEV
    MONGO_PASSWORD = process.env.MONGO_PASSWORD_DEV
    MONGO_DB = process.env.MONGO_DB_DEV
}

// si on est en mode preprod
else if (process.env.ENV == "PREPROD") {
    MONGO_HOST = process.env.MONGO_HOST_PREPROD
    MONGO_PORT = process.env.MONGO_PORT_PREPROD
    MONGO_USER = process.env.MONGO_USER_PREPROD
    MONGO_PASSWORD = process.env.MONGO_PASSWORD_PREPROD
    MONGO_DB = process.env.MONGO_DB_PREPROD
}

// si on est en mode prod
else if (process.env.ENV == "PROD") {
    MONGO_HOST = process.env.MONGO_HOST_PROD
    MONGO_PORT = process.env.MONGO_PORT_PROD
    MONGO_USER = process.env.MONGO_USER_PROD
    MONGO_PASSWORD = process.env.MONGO_PASSWORD_PROD
    MONGO_DB = process.env.MONGO_DB_PROD
}

module.exports = Object.freeze({
    // MONGODB Config
    MONGO_HOST: MONGO_HOST,
    MONGO_PORT: MONGO_PORT,
    MONGO_USER: MONGO_USER,
    MONGO_PASSWORD: MONGO_PASSWORD,
    MONGO_DB: MONGO_DB,
});