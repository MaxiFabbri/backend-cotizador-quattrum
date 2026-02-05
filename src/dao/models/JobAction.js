import mongoose from 'mongoose';

const collection = 'JobActions';

const schema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    action: {
        type: String,
        required: true,
    },
    jobModifiedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
        required: false
    },
    payload: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    oprationSuccess: {
        type: Boolean,
        default: false
    }
})

const jobActionsModel = mongoose.model(collection,schema);

export default jobActionsModel;