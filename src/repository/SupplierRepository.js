import GenericRepository from "./GenericRepository.js";

export default class SupplierRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    
    getSupplierByEmail = (email) =>{
        return this.getBy({email});
    }
    getSupplierById = (id) =>{
        return this.getBy({_id:id})
    }
    getSupplierByIdPopulated = (id) =>{
        console.log("getSupplierByIdPopulated ",id)
        return this.dao.getOneSupplierWithPayemntMethod({_id:id})
    }

    getSupplierByName = (name) =>{  
        return this.getAll({
            $or: [
                { name: { $regex: name, $options: "i" } }, // Coincidencias parciales en "name"
                { code: { $regex: name, $options: "i" } }  // Coincidencias parciales en "code"
            ]
        })
    }
    getSomeSuppliersPopulated = (name) =>{
        return this.dao.getSomeSuppliersWithPaymentMethods({
            $or: [
                { name: { $regex: name, $options: "i" } }, // Coincidencias parciales en "name"
                { code: { $regex: name, $options: "i" } }  // Coincidencias parciales en "code"
            ]
        })
    }
    deleteSupplierById = (id) =>{
        return this.delete(id)
    }
}