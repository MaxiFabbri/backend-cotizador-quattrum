import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'; 

const collection = 'Customers';

const schema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    code:{
        type:String,
        required:false
    },
    cuit:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false,
    },
    phone:{
        type:String,
        required:false
    },
    customerPaymentMethodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerPaymentMethod'
    }
})

schema.plugin(mongoosePaginate)
const customerModel = mongoose.model(collection,schema);

export default customerModel;