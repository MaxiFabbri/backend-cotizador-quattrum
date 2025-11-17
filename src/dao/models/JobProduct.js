import mongoose from 'mongoose';

const collection = 'JobProducts';

const schema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
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
    enteredShipmentCost: {
        type: Number,
        required: false
    },
    otherCost: {
        type: Number,
        required: false
    },
    enteredOtherCost: {
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
    jobProductDescription: {
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
    },
    jobProductNote: {
        type: String,
        required: false
    },
    jobProductStatus: {
        type: String,
        required: true,
        // enum: ['Pendiente', 'En Proceso', 'Terminado', 'Entregado'], // Opciones permitidas
        default: 'Pendiente',
    }
})

const jobProductModel = mongoose.model(collection, schema);

export default jobProductModel;