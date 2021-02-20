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
        for (var column in tableColumns) {
            if (column == tableColumns.length - 1) {
                table += tableColumns[column] + ");";
            } else {
                table += tableColumns[column] + ", ";
            }
        }

        dbClient.query(table)
                .then(res => console.log(table))
                .catch(e => console.error(e.stack));
    }
}

module.exports = Database;
