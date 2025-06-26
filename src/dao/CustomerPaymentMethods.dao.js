import customerPaymentMethodModel from "./models/CustomerPaymentMethod.js";


export default class CustomerPaymentMethods {
    
    get = (params) =>{
        return customerPaymentMethodModel.find(params)
        .sort({ customer_payment_description: 1 }) 
        .limit(50);
    }

    getBy = (params) =>{
        return customerPaymentMethodModel.findOne(params);
    }

    save = (doc) =>{
        return customerPaymentMethodModel.create(doc);
    }

    update = (id,doc) =>{
        return customerPaymentMethodModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return customerPaymentMethodModel.findByIdAndDelete(id);
    }
}