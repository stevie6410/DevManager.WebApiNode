"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var workflow = sequelize.define('workflow', {
        //Fields in the model
        name: { type: S.STRING, allowNull: false }
    },
        {
            classMethods: {
                associate: function (models) {
<<<<<<< Updated upstream
                    workflow.hasMany(models.package);
                    workflow.hasMany(models.workflowStage);
=======
                    Workflow.hasMany(models.Package);
                    Workflow.hasMany(models.WorkflowStage);
>>>>>>> Stashed changes
                }
            },
            //Options for the model
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true //Add deleted timestamp flag instead of actual deletion});
        });

    return workflow;
};

