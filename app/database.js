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
        var value = await this.selectQuery("corpo", "characters", "uniquechannelid=" + sender)
        if (value !== undefined) {
            return value.corpo;
        } else {
            return false;
        }
    }

    async getSender(channelId) {
        var value;

        value = await this.selectQuery("name", "characters", "uniquechannelid=" + channelId);
        if (value !== undefined) {
            return value.name;
        }
    }

    async getReciver(reciverName, senderId) {
        var name,
            data,
            nicknameText;

        nicknameText = "SELECT characters.uniquechannelid FROM characters "
                     + "INNER JOIN nicknames ON characters.characterid = nicknames.characterid "
                     + "INNER JOIN players ON nicknames.playerid = players.playerid "
                     + "WHERE LOWER(nicknames.nickname)=LOWER('"+ reciverName + "') "
                     + "AND players.playerid="+ senderId + ";";

        data = await Promise.all([
            this.selectQuery("uniquechannelid", "characters", "LOWER(name)=LOWER('" + reciverName + "')"),
            this.customQuery(nicknameText)
        ])

        if (data[0] !== undefined) {
            return data[0].uniquechannelid;
        } else if (data[1] !== undefined && data[1].rows[0] !== undefined) {
            return data[1].rows[0].uniquechannelid;
        }
    }

    async selectQuery(columns, table, query) {
        var text = "SELECT " + columns + " FROM " + table + " WHERE " + query,
            value = await this.customQuery(text);

        if (value !== undefined) {
            return value.rows[0];
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
