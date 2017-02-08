"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    var PackageDbObject = sequelize.define("PackageDbObject", {
        guid: { type: S.STRING, allowNull: false },
        objeckKey: { type: S.STRING, allowNull: false },
        databaseName: { type: S.STRING, allowNull: false },
        schemaName: { type: S.STRING, allowNull: false },
        objectName: { type: S.STRING, allowNull: false },
        lastEventType: { type: S.STRING, allowNull: false },
        lastEventDDL: { type: S.TEXT, allowNull: false },
        createdBy: { type: S.STRING, allowNull: false },
        modifiedBy: { type: S.STRING, allowNull: false },
        deployOrder: { type: S.INTEGER, allowNull: false },
    }, {
            classMethods: {
                associate: function (models) {
                    PackageDbObject.belongsTo(models.Package);
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

//         public int Id { get; set; }
//         public Guid Guid { get; set; }
//         public string ObjectKey { get; set; }
//         public string DatabaseName { get; set; }
//         public string SchemaName { get; set; }
//         public string ObjectName { get; set; }
//         public string LastEventType { get; set; }
//         public string LastEventDDL { get; set; }
//         public DateTime CreatedOn { get; set; }
//         public string CreatedBy { get; set; }
//         public DateTime ModifiedOn { get; set; }
//         public string ModifiedBy { get; set; }
//         public string ObjectType { get; set; }
//         public string AttatchType { get; set; }
//         public int DeployOrder { get; set; }
//         public Package Package { get; set; }