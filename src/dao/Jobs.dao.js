import jobsModel from './models/Job.js';


export default class jobs {

    get = (params) => {
        return jobsModel.find(params);
    }

    getBy = (params) => {
        return jobsModel.findOne(params);
    }

    getOneJobByIdwithCustomerDetails = (id) => {
        return jobsModel.findOne({ _id: id })
            .populate({
                path: 'customerId',
                populate: {
                    path: 'customerPaymentMethodId'
                }
            })
            .populate({
                path: 'paymentMethodId',
            })
    }

    save = (doc) => {
        return jobsModel.create(doc);
    }

    update = (id, doc) => {
        return jobsModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
        return jobsModel.findByIdAndDelete(id);
    }
}