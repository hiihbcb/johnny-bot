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

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(databaseUrl, {logging:false});

const Players = sequelize.define('players', {
    playerid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    }, name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

const Characters = sequelize.define('characters', {
    characterid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }, playerid: {
        type: DataTypes.BIGINT,
        references: {
            model: Players,
            key: 'playerid'
        }
    }, uniquechannelid: {
        type: DataTypes.BIGINT,
        allowNull: false
    }, name: {
        type: DataTypes.STRING,
        allowNull: false
    }, frontname: {
        type: DataTypes.STRING,
        allowNull: false
    }, eddies: {
        type: DataTypes.BIGINT
    }, corpo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }, notes: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

const Quotes = sequelize.define('quotes', {
    quoteid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }, quote: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

class Models {
    async initializeTables() {
        try {
            await sequelize.authenticate();
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        await Players.sync({ alter: true });
        await Characters.sync({ alter: true });
        await Quotes.sync({ alter: true });

        console.log('Database has been synced successfully');
    }
}

module.exports = Models;
