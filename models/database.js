"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var Database = sequelize.define('Database', {
        name: { type: S.STRING, allowNull: false },
        databaseName: { type: S.STRING, allowNull: false },
        serverName: { type: S.STRING, allowNull: false },
        useWindowsAuth: { type: S.BOOLEAN, default: true },
        username: { type: S.STRING, allowNull: true },
        password: { type: S.STRING, allowNull: true }
    },
        {
            classMethods: {
                
            },
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true
        });

    return Database;
}