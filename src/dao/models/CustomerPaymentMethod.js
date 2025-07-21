import mongoose from 'mongoose';

const collection = 'CustomerPaymentMethod';

const schema = new mongoose.Schema({
    customer_payment_description:{
        type: String,
        required:true
    },
    days_to_collect:{
        type:Number,
        required:false
    },
    customer_payment_details:{
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

const customerPaymentMethodModel = mongoose.model(collection,schema);

export default customerPaymentMethodModel;