import jobProcessModel from './models/JobProcess.js';


export default class jobProducts {

    get = (params) => {
        return jobProcessModel.find(params);
    }

    getBy = (params) => {
        return jobProcessModel.findOne(params);
    }

    save = (doc) => {
        return jobProcessModel.create(doc);
    }

    update = (id, doc) => {
        return jobProcessModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
        return jobProcessModel.findByIdAndDelete(id);
    }
}