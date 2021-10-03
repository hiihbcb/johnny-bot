/**
* @Author HIIHBCB
* @License AGPL-3.0-or-later
*/

module.exports = {
    staging: {
        url: process.env.STAGING_DATABASE_URL,
        dialect: 'postgres',
        logging: false
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        logging: false
    },
};
