import mongoose from 'mongoose';

const collection = 'Products';

const schema = new mongoose.Schema({
    quotationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quotations'
    },
    quantity: {
        type: Number,
        required: true
    },
    productionDays: {
        type: Number,
        required: true
    },
    financingCost: {
        type: Number,
        required: false
    },
    shipmentCost: {
        type: Number,
        required: false
    },
    otherCost: {
        type: Number,
        required: false
    },
    unitSellingPrice: {
        type: Number,
        required: false
    },
    calculatedSellingPrice: {
        type: Number,
        required: false
    },
    isManual: {
        type: Boolean,
        required: true,
        default: false
    },
    productDescription: {
        type: String,
        required: false
    },
    totalProductCost: {
        type: Number,
        required: false
    },
    order: {
        type: Number,
        required: false
    }
})

const productModel = mongoose.model(collection, schema);

export default productModel;