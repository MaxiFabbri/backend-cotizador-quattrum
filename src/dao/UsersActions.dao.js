import usersActionsModel from './models/UserAction.js';


export default class UsersActions {
    
    get = (params) =>{
        return usersActionsModel.find(params);
    }

    getBy = (params) =>{
        return usersActionsModel.findOne(params);
    }

    save = (doc) =>{
        return usersActionsModel.create(doc);
    }

    update = (id,doc) =>{
        return usersActionsModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return usersActionsModel.findByIdAndDelete(id);
    }
}