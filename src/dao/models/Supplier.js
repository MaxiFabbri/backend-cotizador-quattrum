import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'Suppliers';

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
    supplierPaymentMethodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupplierPaymentMethods'
    }
})

schema.plugin(mongoosePaginate);
const supplierModel = mongoose.model(collection,schema);

export default supplierModel;