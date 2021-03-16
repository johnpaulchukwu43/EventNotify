const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    database:process.env.DATABASE_URL,
    publisherAppPort: process.env.PUBLISHER_APP_PORT,
    subscriberAppPort: process.env.SUBSCRIBER_APP_PORT,
    databaseUsername:process.env.DATABASE_USERNAME,
    nodeEnv:process.env.NODE_ENV
};
