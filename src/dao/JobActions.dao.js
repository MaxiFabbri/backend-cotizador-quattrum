import jobActionsModel from './models/JobAction.js';


export default class JobActions {
    
    get = (params) =>{
        return jobActionsModel.find(params);
    }

    getBy = (params) =>{
        return jobActionsModel.findOne(params);
    }

    save = (doc) =>{
        return jobActionsModel.create(doc);
    }

    update = (id,doc) =>{
        return jobActionsModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return jobActionsModel.findByIdAndDelete(id);
    }
}