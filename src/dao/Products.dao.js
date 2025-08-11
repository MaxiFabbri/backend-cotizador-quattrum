import productModel from './models/Product.js';


export default class Products {
    
    get = (params) =>{
        return productModel.find(params);
    }

    getBy = (params) =>{
        return productModel.findOne(params);
    }

    getByQuotationId = (params) => {
        console.log("Getting products by quotationId with params: ", params);
        return productModel.find(params)
        .sort({ order: 1 })      
    }

    save = (doc) =>{
        return productModel.create(doc);
    }

    update = (id,doc) =>{
        return productModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return productModel.findByIdAndDelete(id);
    }

    deleteMany = (params) => {
        return productModel.deleteMany(params);
    }
}