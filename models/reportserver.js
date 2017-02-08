"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var ReportServer = sequelize.define('ReportServer', {
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

    return ReportServer;
}