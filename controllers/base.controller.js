

module.exports = class BaseController {

    constructor(model) {
        this.model = model;
    }

    logModel() {
        console.log(this.model);
    }

    getAll() {
        return this.model.findAll();
    }

}