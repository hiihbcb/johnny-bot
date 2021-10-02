/**
* @Author HIIHBCB
* @License AGPL-3.0-or-later
*/

// Database connection
if (process.env.NODE_ENV == 'production') {
    var databaseUrl = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV == 'staging') {
    var databaseUrl = process.env.STAGING_DATABASE_URL;
}

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(databaseUrl, {logging:false});

class Database {
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

    async getChannelCharacterName(channelId) {
        var value;

        value = await this.selectQuery("characters", "uniquechannelid=" + channelId, "frontname");
        if (value !== undefined) {
            return value.frontname;
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
            return value;
        }
    }

    async getBalance(channelId) {
        var value;

        value = await this.selectQuery("characters", "uniquechannelid=" + channelId, "eddies");
        if (value !== undefined) {
            return value.eddies;
        }
    }

    async updateBalance(channelId, Balance) {
        await this.updateField("characters", "uniquechannelid=" + channelId, "eddies=" + Balance);
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
                return value;
            } else {
                return value[0];
            }
        }
    }

    async updateField(table, query, columns) {
        var text = "UPDATE " + table + " SET " + columns + " WHERE " + query;
        this.customQuery(text);
    }

    async customQuery(query) {
        var value,
            metadata;

        try {
            [value, metadata] = await sequelize.query(query)
        } catch (err) {
            console.log(err.stack);
        }

        if (value) {
            return value;
        }
    }
}

module.exports = Database;
