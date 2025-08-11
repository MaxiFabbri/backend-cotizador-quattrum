import mongoose from 'mongoose';

const collection = 'Processes';

const schema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
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
    daysToPayment: {
        type: Number,
        required: false
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
    }
})

const processModel = mongoose.model(collection, schema);

export default processModel;