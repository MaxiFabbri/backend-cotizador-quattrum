import GenericRepository from "./GenericRepository.js";

export default class JobRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    getJobById = (id) =>{
        return this.getBy({_id:id})
    }
    getJobByIdPopulated = (id) =>{
        return this.dao.getOneJobByIdwithCustomerDetails(id)
    }
    getJobsPopulatedFilteredPaginated = (filters, options) => {
        return this.dao.getJobsPopulatedFilteredPaginated(filters, options);
    }
    deleteJobById = (id) =>{
        return this.delete(id)
    }
    
}