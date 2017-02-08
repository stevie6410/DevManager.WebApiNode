"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    var PackageDbObject = sequelize.define("PackageDbObject", {
        name: { type: S.STRING, allowNull: false, unique: true },
        description: { type: S.TEXT, allowNull: true },
        status: { type: S.TEXT, allowNull: false },
        ticketRef: { type: S.TEXT, allowNull: false },
        createdBy: { type: S.TEXT, allowNull: false },
        modifiedBy: { type: S.TEXT, allowNull: true }
    }, {
            classMethods: {
                associate: function (models) {
                    Package.belongsTo(models.Workflow, {
                        onDelete: "CASCADE",
                        foreignKey: { allowNull: false }
                    });
                }
            },
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true //Add deleted timestamp flag instead of actual deletion
        });

    return PackageDbObject;

};