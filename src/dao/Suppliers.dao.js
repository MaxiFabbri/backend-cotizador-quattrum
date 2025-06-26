import supplier from "./models/Supplier.js";

export default class Suppliers {

    get = (params) => {
        return supplier.find(params);
    }

    getBy = (params) => {
        return supplier.findOne(params);
    }

    getSomeSuppliersWithPaymentMethods = (params) => {
        return supplier.find(params)
            .populate({
                path: 'supplierPaymentMethodId',
                select: 'supplier_payment_description'
            })
            .sort({ name: 1 }) 
            .limit(50); 
    }

    getOneSupplierWithPayemntMethod = (params) => {
        return supplier.findOne(params)
            .populate({
                path: 'supplierPaymentMethodId',
                select: 'supplier_payment_description'
            })
    }
    save = (doc) => {
        return supplier.create(doc);
    }

    update = (id, doc) => {
        return supplier.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
        return supplier.findByIdAndDelete(id);
    }
}