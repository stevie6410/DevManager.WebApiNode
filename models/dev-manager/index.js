"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join('../../config/config.json'))[env];
if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
var db = {};
var models = [];

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
    models.push(model.name);
  });

Object.keys(db).forEach(function (modelName) {
  // console.log('Model: ', modelName);
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }

  //Dynamicaly pickup a list of tables and associate the belongsTo functions
  if ("belongsToModels" in db[modelName]) {
    if (Array.isArray(db[modelName].belongsToModels)) {
      db[modelName].belongsToModels.forEach(function (to) {
        db[modelName].belongsTo(db[to]);
      })
    };
  };

  //Dynamicaly pickup a list of tables and associate the belongsToMany functions
  if ("belongsToManyModels" in db[modelName]) {
    if (Array.isArray(db[modelName].belongsToManyModels)) {
      db[modelName].belongsToManyModels.forEach(function (to) {
        if (typeof to === 'string' || to instanceof String) {
          //Just a string
          db[modelName].belongsToMany(db[to]);
        } else {
          //A full object
          if (to.through != null) {
            db[modelName].belongsToMany(db[to.model], { through: to.through });
          } else {
            db[modelName].belongsToMany(db[to.model]);
          }
        }
      })
    };
  };

  //Dynamicaly pickup a list of tables and associate the hasMany functions
  if ("hasManyModels" in db[modelName]) {
    if (Array.isArray(db[modelName].hasManyModels)) {
      db[modelName].hasManyModels.forEach(function (to) {
        if (typeof to === 'string' || to instanceof String) {
          //Just a string
          db[modelName].hasMany(db[to]);
        } else {
          //A full object
          db[modelName].hasMany(db[to.model]);
        }
        // console.log('----hasMany-----' + to);
      })
    };
  };
});

db.models = models;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;