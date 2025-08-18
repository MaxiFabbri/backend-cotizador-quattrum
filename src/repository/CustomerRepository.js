
import GenericRepository from "./GenericRepository.js";

export default class CustomerRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    getAllCustomersPopulated = () =>{
        return this.dao.getCustomersWithPaymentMethods()
    }
    getCustomerByEmail = (email) =>{
        return this.getBy({email});
    }
    getCustomerById = (id) =>{
        return this.getBy({_id:id})
    }

    getCustomersPopulatedPaginated = (params,options) =>{
        return this.dao.getCustomersPopulatedPaginated(params,options)
    }

    getCustomerByIdPopulated = (id) =>{
        return this.dao.getOneCustomerWithPaymentMethod({_id:id})
    }
    
    getSomeCustomersPopulated = (name) =>{
        return this.dao.getSomeCustomersWithPaymentMethods({
            $or: [
                { name: { $regex: name, $options: "i" } }, // Coincidencias parciales en "name"
                { code: { $regex: name, $options: "i" } }  // Coincidencias parciales en "code"
            ]
        })
    }

    getCustomerByNameOrCode = (name) =>{  
        return this.getAll({
            $or: [
                { name: { $regex: name, $options: "i" } }, // Coincidencias parciales en "name"
                { code: { $regex: name, $options: "i" } }  // Coincidencias parciales en "code"
            ]
        })
    }
    deleteCustomerById = (id) =>{
        return this.delete(id)
    }
    
}