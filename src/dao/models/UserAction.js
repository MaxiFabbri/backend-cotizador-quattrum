import mongoose from 'mongoose';

const collection = 'UsersActions';

const schema = new mongoose.Schema({
    date_time: {
        type: Date,
        default: Date.now
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
    quotationModifiedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quotations',
        required: false
    },
    oprationSucces: {
        type: Boolean,
        default: false
    }
})

const usersActionsModel = mongoose.model(collection,schema);

export default usersActionsModel;