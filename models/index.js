"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
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
  console.log(modelName);
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
  if ("belongsTo" in db[modelName]) {
    if (Array.isArray(db[modelName].belongsTo)) {
      db[modelName].belongsTo.forEach(function (to) {
        console.log('---------' + to);
      })
    };
  };
});

db.models = models;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;