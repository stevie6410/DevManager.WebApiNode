"use strict";

module.exports = function (sequelize, DataTypes) {
    var deployEnvironment = sequelize.define('deployEnvironment', {
        name: { type: DataTypes.STRING, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false }
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

        deployEnvironment.generateRoutes = true;

    return deployEnvironment;
}
