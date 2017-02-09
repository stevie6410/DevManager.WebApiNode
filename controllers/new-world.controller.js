var BaseController = require('./base.controller');
var model = require('../models').database;

var newWorldClass = class NewWorldController extends BaseController {

    constructor() {
        super(model);
    }

    getById(id) {
        console.log('This is the custom controller');
        return model.findById(id).then(data => {
            return data;
        });
    }

}

module.exports = newWorldClass;
