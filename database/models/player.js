/**
* @Author HIIHBCB
* @License AGPL-3.0-or-later
*/

'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Player extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    };
    Player.init({
        playerid: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        }, name: {
            type: DataTypes.STRING,
            allowNull: false
        }, encryptedPassword: {
            type: DataTypes.STRING,
            required: true
        }, admin: {
            type: DataTypes.BOOLEAN,
            required: true,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'player',
        timestamps: false
    });
    return Player;
};
