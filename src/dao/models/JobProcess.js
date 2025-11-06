import mongoose from 'mongoose';

const collection = 'JobProcesses';

const schema = new mongoose.Schema({
    jobProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobProducts'
    },
    description: {
        type: String,
        required: false
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Suppliers'
    },
    supplierPaymentMethodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupplierPaymentMethods'
    },
    supplierPaymentDetails: {
        type: [{
            id: String,
            percentage: Number,
            description: String,
            days: Number,
            downpayment: Boolean
        }],
        required:false
    },
    currency: {
        type: String,
        required: true,
        enum: ['Dolar', 'Peso'],
        default: 'Peso',
    },
    unitCost: {
        type: Number,
        required: true
    },
    fixedCost: {
        type: Number,
        required: true
    },
    adjustPercentage: {
        type: Number,
        required: true
    },
    subTotalProcessCost: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: false
    },
    jobProcessNote: {
        type: String,
        required: false
    }
})

const jobProcessModel = mongoose.model(collection, schema);

export default jobProcessModel;