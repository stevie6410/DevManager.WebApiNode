
var BaseController = require('./base.controller');

var newWorldClass = class NewWorldController extends BaseController {

    constructor(model) {
        super(model);
    }

}

module.exports = newWorldClass;
