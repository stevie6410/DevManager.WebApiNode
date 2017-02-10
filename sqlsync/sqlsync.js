"use strict"

var Connection = require('tedious').Connection;
var config = {
    server: 'localhost',
    userName: 'sa',
    password: 'Password2',
    options: {
        database: 'ReportData'
    }
};
var connection = new Connection(config);
var Request = require('tedious').Request;

connection.on('connect', function (err) {
    if (!err) {
        console.log('Connected to db');
        executeStatment();
    } else {
        console.log('Connnection failed: ', err);
    }
});


function executeStatment() {
    var request = new Request("SELECT TOP 2 * FROM sys.objects", function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }
    });

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.log(column.value);
        });
    });
    
    connection.execSql(request);
}
