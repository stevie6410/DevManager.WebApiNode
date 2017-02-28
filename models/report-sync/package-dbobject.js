"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    var packageDbObject = sequelize.define("packageDbObject", {
        guid: { type: S.STRING, allowNull: false },
        objectKey: { type: S.STRING, allowNull: false },
        databaseName: { type: S.STRING, allowNull: false },
        schemaName: { type: S.STRING, allowNull: false },
        objectName: { type: S.STRING, allowNull: false },
        objectType: { type: S.STRING, allowNull: false },
        lastEventType: { type: S.STRING, allowNull: false },
        lastEventDDL: { type: S.TEXT, allowNull: false },
        createdBy: { type: S.STRING, allowNull: false },
        modifiedBy: { type: S.STRING, allowNull: false },
        deployOrder: { type: S.INTEGER, allowNull: false },
    }, {
            classMethods: {},
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true //Add deleted timestamp flag instead of actual deletion
        });

    packageDbObject.generateRoutes = true;

    return packageDbObject;

};
