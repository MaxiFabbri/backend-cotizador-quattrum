import jobProductModel from './models/JobProduct.js';

export default class jobProducts {

    get = (params) => {
        return jobProductModel.find(params);
    }

    getBy = (params) => {
        return jobProductModel.findOne(params);
    }
    getByJobId = (params) => {
        return jobProductModel.find(params)
        .sort({ order: 1 })      
    }

    save = (doc) => {
        return jobProductModel.create(doc);
    }

    update = (id, doc) => {
        return jobProductModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
        return jobProductModel.findByIdAndDelete(id);
    }
}