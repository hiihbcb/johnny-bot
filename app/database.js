/**
* @Author HIIHBCB
*/

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

    async getCorpo(sender) {
        var value = await this.selectQuery("characters", "uniquechannelid=" + sender, "corpo")
        if (value !== undefined) {
            return value.corpo;
        } else {
            return false;
        }
    }

    async getAllNames() {
        return await this.selectQuery("characters", "name IS NOT NULL", "name, frontname", true);
    }

    async getSender(channelId) {
        var value;

        value = await this.selectQuery("characters", "uniquechannelid=" + channelId, "name");
        if (value !== undefined) {
            return value.name;
        }
    }

    async getCharacterChannelId(reciverName) {
        var value;

        value = await this.selectQuery("characters", "LOWER(name)=LOWER('" + reciverName + "')", "uniquechannelid");
        if (value !== undefined) {
            return value.uniquechannelid;
        }
    }

    async getQuotes() {
        var value;

        value = await this.customQuery("SELECT quote FROM quotes");
        if (value !== undefined) {
            return value.rows;
        }
    }

    async deleteRow(table, query, returning = '') {
        var text = "DELETE FROM " + table + " WHERE " + query + returning + ";";
        return this.customQuery(text);
    }

    async insertInto(table, columns, values, output = '') {
        var text = "INSERT INTO " + table + "(" + columns + ") VALUES(" + values + ")" + output +";";
        return this.customQuery(text);
    }

    async selectQuery(table, query, columns = 1, returnArray = false) {
        var text = "SELECT " + columns + " FROM " + table + " WHERE " + query,
            value = await this.customQuery(text);

        if (value !== undefined) {
            if (returnArray) {
                return value.rows;
            } else {
                return value.rows[0];
            }
        }
    }

    async customQuery(query) {
        var value;

        try {
            value = await dbClient.query(query)
        } catch (err) {
            console.log(err.stack);
        }

        if (value) {
            return value;
        }
    }
}

module.exports = Database;
