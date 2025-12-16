import mongoose from 'mongoose';

const collection = 'Messages';

const schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    emiterUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    },
    message: {
        type: String,
        required: true,
    },
    quotationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quotations',
        required: false
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
        required: false
    },
})

const messagesModel = mongoose.model(collection,schema);

export default messagesModel;