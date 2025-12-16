import jobsActionsModel from './models/JobAction.js';
import messagesModel from './models/Message.js';


export default class Messages {
    
    get = (params) =>{
        return messagesModel.find(params);
    }

    getBy = (params) =>{
        return messagesModel.findOne(params);
    }

    save = (doc) =>{
        return messagesModel.create(doc);
    }

    update = (id,doc) =>{
        return messagesModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return messagesModel.findByIdAndDelete(id);
    }
}