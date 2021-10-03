/**
* @Author HIIHBCB
* @License AGPL-3.0-or-later
*/

'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Character extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    };
    Character.init({
        characterid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }, playerid: {
            type: DataTypes.BIGINT
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
        sequelize,
        modelName: 'character',
        timestamps: false
    });
    return Character;
};
