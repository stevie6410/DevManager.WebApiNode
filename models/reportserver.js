"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var reportServer = sequelize.define('reportServer', {
        name: { type: S.STRING, allowNull: false },
        reportServerAddress: { type: S.STRING, allowNull: false },
        reportManagerAddress: { type: S.STRING, allowNull: false }
    },
        {
            classMethods: {},
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true
        });

    return reportServer;
}