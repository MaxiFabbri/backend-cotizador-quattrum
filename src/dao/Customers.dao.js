import customerModel from './models/Customer.js';


export default class Customers {
    
    get = (params) =>{
        return customerModel.find(params);
    }
    
    getSomeCustomersWithPaymentMethods = (params) =>{
        return customerModel.find(params)
            .populate({
                path: 'customerPaymentMethodId',
                select: 'customer_payment_description'
            })
    }
    getOneCustomerWithPaymentMethod = (params) =>{
        return customerModel.findOne(params)
            .populate({
                path: 'customerPaymentMethodId',
                select: 'customer_payment_description'
            })
    }

    getCustomersWithPaymentMethods = () =>{
        return customerModel.find()
            .populate({
                path: 'customerPaymentMethodId',
                select: 'customer_payment_description'
            })
    }
    getBy = (params) =>{
        return customerModel.findOne(params);
    }

    save = (doc) =>{
        return customerModel.create(doc);
    }

    update = (id,doc) =>{
        return customerModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return customerModel.findByIdAndDelete(id);
    }
}