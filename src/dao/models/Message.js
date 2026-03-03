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
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'delivered', 'read'],
        default: 'pending'
    }
})

const messagesModel = mongoose.model(collection,schema);

export default messagesModel;