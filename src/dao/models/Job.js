import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'Jobs';

const schema = new mongoose.Schema({
    quotationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quotations',
        required: false
    },
    calculateFinancing: {
        type: Boolean,
        required: true,
        default: false
    },
    approvalDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: false
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },
    paymentMethodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerPaymentMethod'
    },
    customerPaymentDetails: {
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
                enum: [ 'Anticipo', 'Total', 'Otro' ],  
                required: true
            },
            invoiceNote: String,

            collections: [{
                collectionDate: { type: Date },
                collectionType: {
                    type: String,
                    enum: [ 'Anticipo', 'Total', 'Otro' ],
                },    
                collectionNote: String
            }]
        }]
    },

    monthlyRate: {
        type: Number,
        required: false
    },
    currency: {
        type: String,
        required: true,
        enum: ['Dolar', 'Peso'],
        default: 'Peso',
    },
    exchangeRate: {
        type: Number,
        required: true
    },
    approvedExchangeRate: {
        type: Number,
        required: false
    },
    jobStatus: {
        type: String,
        required: true,
        enum: [ 'Aprobado', 'En Producción', 'Para Entregar', 'Entregado', 'Cerrado', 'Anulado'], // Opciones permitidas
        default: 'Aprobado',
    }, 
    isKit: {
        type: Boolean,
        required: true,
        default: false
    },
    jobNotes: {
        type: String,
        required: false,
    }
})

schema.plugin(mongoosePaginate)
const jobsModel = mongoose.model(collection, schema);

export default jobsModel;