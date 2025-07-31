import mongoose from 'mongoose';
// import supplierPaymentMethodsModel from './SupplierPaymentMethod.js';

const collection = 'Suppliers';

const schema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    code:{
        type:String,
        required:false
    },
    cuit:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false,
    },
    phone:{
        type:String,
        required:false
    },
    supplierPaymentMethodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupplierPaymentMethods'
    }
})

const supplierModel = mongoose.model(collection,schema);

export default supplierModel;