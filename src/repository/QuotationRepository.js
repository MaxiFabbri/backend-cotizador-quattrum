import GenericRepository from "./GenericRepository.js";

export default class QuotationRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    getAllQuotationsPopulated = () =>{
        return this.dao.getQuotationsWithCustomerDetails() 
    }
    getQuotationsByIdPopulated = (id) =>{
        return this.dao.getOneQuotationByIdwithCustomerDetails(id)
    }
    getQuotationById = (id) =>{
        return this.getBy({_id:id})
    }
    deleteQuotationById = (id) =>{
        return this.delete(id)
    }
    getQuotationsFilteredByCustomerIdsPopulated(customerIds){
        return this.dao.getQuotationsByIdWithCustomerDetails( { customerId: { $in: customerIds } } )        
    }
    getQuotationsFilteredPopulated(customerIds, quoteStatus){
        return this.dao.getQuotationsFilteredPopulated( { customerId: { $in: customerIds }, quoteStatus } )        
    }
    getQuotationsFilteredPaginated = (customerIds, quoteStatus, options) => {
        return this.dao.getQuotationsFilteredPaginated({ customerId: { $in: customerIds }, quoteStatus }, options);
    }
    
    getQuotationsPopulatedFilteredPaginated = (name, quoteStatus, options) => {
        return this.dao.getQuotationsPopulatedFilteredPaginated({ name, quoteStatus }, options);
    }
}