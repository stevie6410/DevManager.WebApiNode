module.exports = class BaseController {

    constructor(model) {
        this.model = model;
    }

    getAll() {
        return this.model.findAll();
    }

    getById(id) {
        return this.model.findById(id);
    }

    create(entity) {
        return model.create(entity);
    }

    update(id, entity) {
        model.findById(id).then(data => {
            return data.update(entity);
        });
    }

    delete(id) {
        model.findById(id).then(data => {
            return data.destroy();
        });
    }
}