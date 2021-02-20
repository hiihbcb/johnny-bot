// Database connection
if (process.env.NODE_ENV == 'production') {
    var databaseUrl = process.env.DATABASE_URL,
        sslConfig = { rejectUnauthorized: false };
} else if (process.env.NODE_ENV == 'staging') {
    var databaseUrl = process.env.STAGING_DATABASE_URL;
        sslConfig = false;
}

const pg = require('pg').Client;

const dbClient = new pg({
  connectionString: databaseUrl,
  ssl: sslConfig
});

dbClient.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('Database connected')
  }
});

const tableList = require('../json_files/tables.json');

class Database {
    initializeTables() {
        for (var table in tableList) {
            this.generateTable(table, tableList[table]);
        }
    }

    generateTable(tableName, tableColumns) {
        var table = "CREATE TABLE IF NOT EXISTS " + tableName + " (";
        table = this.concatColumn(table, tableColumns);

        dbClient.query(table)
                .then(res => console.log(table))
                .catch(e => console.error(e.stack));
    }

    concatColumn(text, values, endOfLine = ");", seperator = ", ") {
        for (var value in values) {
            if (value == values.length - 1) {
                text += values[value] + endOfLine;
            } else {
                text += values[value] + seperator;
            }
        }
        return text;
    }
}

module.exports = Database;
