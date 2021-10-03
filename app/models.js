/**
* @Author HIIHBCB
* @License AGPL-3.0-or-later
*/

const {
    sequelize,
    character,
    player,
    quote
} = require('../database/models');

class Models {
    async initializeTables() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        await player.sync({ alter: true });
        await character.sync({ alter: true });
        await quote.sync({ alter: true });

        console.log('Database has been synced successfully');
    }
}

module.exports = Models;
