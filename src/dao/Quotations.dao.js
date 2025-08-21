// import { name } from 'faker/lib/locales/az/index.js';
import quotationModel from './models/Quotation.js';


export default class quotations {

    get = (params) => {
        return quotationModel.find(params);
    }

    getQuotationsWithCustomerDetails = () => {
        return quotationModel.find()
            .populate({
                path: 'customerId',
                populate: {
                    path: 'customerPaymentMethodId'
                }
            })
    }

    getOneQuotationByIdwithCustomerDetails = (id) => {
        return quotationModel.findOne({_id:id})
            .populate({
                path: 'customerId',
                populate: {
                    path: 'customerPaymentMethodId'
                }
            })
            .populate({
                path:'paymentMethodId',
            })
    }

    getQuotationsFilteredPopulated = (query) => {
        const response = quotationModel.find(query)
        .populate({
            path: 'customerId',
            populate: {
                path: 'customerPaymentMethodId'
            }
        })
        .sort({ date: -1 }) 
        .limit(100);
        return response
    }

    getQuotationsFilteredPaginated = (params, options) => {
        const finalOptions = {
            ...options,
            sort: { date: -1 },
            populate: {
                path: 'customerId',
                populate: {
                    path: 'customerPaymentMethodId',
                    select: 'customer_payment_description'
                }
            }
        };
    
        return quotationModel.paginate(params, finalOptions);
    }
    
    getQuotationsByIdWithCustomerDetails = (query) => {
        const response = quotationModel.find(query)
        .populate({
            path: 'customerId',
            populate: {
                path: 'customerPaymentMethodId'
            }
        })
        .sort({ date: -1 }) 
        .limit(100);
        return response
    }

    getBy = (params) => {
        return quotationModel.findOne(params);
    }

    save = (doc) => {
        return quotationModel.create(doc);
    }

    update = (id, doc) => {
        return quotationModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
        return quotationModel.findByIdAndDelete(id);
    }
}