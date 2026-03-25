import messagesModel from './models/Message.js';


export default class Messages {
  get = (params) => {
    return messagesModel.find(params);
  };
  getPendingByUserId = (query) => {
    return messagesModel.find(query);
  };

  getBy = (params) => {
    return messagesModel.findOne(params);
  };

  save = (doc) => {
    return messagesModel.create(doc);
  };

  update = (id, doc) => {
    return messagesModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return messagesModel.findByIdAndDelete(id);
  };
}