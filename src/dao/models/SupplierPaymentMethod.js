import mongoose from 'mongoose';

const collection = 'SupplierPaymentMethod';

const schema = new mongoose.Schema({
    supplier_payment_description:{
        type: String,
        required:true
    },
    days_to_payment:{
        type:Number,
        required:false
    },
    supplier_payment_details:{
        type: [{
            id: String,
            percentage: Number,
            description: String,
            days: Number,
            downpayment: Boolean
        }],
        required:false
    }
})

const supplierPaymentMethodModel = mongoose.model(collection,schema);

export default supplierPaymentMethodModel;