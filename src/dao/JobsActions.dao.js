import jobsActionsModel from './models/JobAction.js';


export default class JobsActions {
    
    get = (params) =>{
        return jobsActionsModel.find(params);
    }

    getBy = (params) =>{
        return jobsActionsModel.findOne(params);
    }

    save = (doc) =>{
        return jobsActionsModel.create(doc);
    }

    update = (id,doc) =>{
        return jobsActionsModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return jobsActionsModel.findByIdAndDelete(id);
    }
}