// Database connection
if (process.env.NODE_ENV == 'production') {
    var databaseUrl = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV == 'staging') {
    var databaseUrl = process.env.STAGING_DATABASE_URL;
}

const pg = require('pg').Client;

const dbClient = new pg({
  connectionString: databaseUrl
});

dbClient.connect();

class Database {
}

module.exports = Database;