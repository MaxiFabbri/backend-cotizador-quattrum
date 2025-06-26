import customer from './models/Customer.js';


export default class Customers {
    
    get = (params) =>{
        return customer.find(params);
    }
    
    getSomeCustomersWithPaymentMethods = (params) =>{
        return customer.find(params)
            .populate({
                path: 'customerPaymentMethodId',
                select: 'customer_payment_description'
            })
            .sort({ name: 1 }) 
            .limit(100);
    }
    getOneCustomerWithPaymentMethod = (params) =>{
        return customer.findOne(params)
            .populate({
                path: 'customerPaymentMethodId',
                select: 'customer_payment_description'
            })
    }

    getCustomersWithPaymentMethods = () =>{
        return customer.find()
            .populate({
                path: 'customerPaymentMethodId',
                select: 'customer_payment_description'
            })
    }
    getBy = (params) =>{
        return customer.findOne(params);
    }

    save = (doc) =>{
        return customer.create(doc);
    }

    update = (id,doc) =>{
        return customer.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return customer.findByIdAndDelete(id);
    }
}