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
    invoices: {
        type: [{
            invoiceNumber: String,
            invoiceType: {
                type: String,
                enum: [ 'Anticipado', 'Contra Entrega', 'Mensual', 'Otro' ],  
                required: true
            },
            invoiceNote: String,

            payments: [{
                paymentDate: { type: Date },
                paymentType: {
                    type: String,
                    enum: [ 'Anticipo', 'Total', 'Otro' ],
                },    
                paymentNote: String
            }]
        }]
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
    enteredUnitCost: {
        type: Number,
        required: false
    },
    fixedCost: {
        type: Number,
        required: true
    },
    enteredFixedCost: {
        type: Number,
        required: false
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
    },
    jobProcessStatus: {
        type: String,
        required: true,
        // enum: ['Pendiente', 'En Proceso', 'Terminado', 'Entregado'], // Opciones permitidas
        default: 'Pendiente',
    },
    savedToDB: {
        type: Boolean,
        required: true,
        default: true,
    }
})

const jobProcessModel = mongoose.model(collection, schema);

export default jobProcessModel;