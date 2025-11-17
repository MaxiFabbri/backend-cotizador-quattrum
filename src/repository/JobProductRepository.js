import GenericRepository from "./GenericRepository.js";

export default class JobProductRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    getJobProductById = (id) =>{
        return this.getBy({_id:id})
    }
    getJobProductByJobId = (jobId) =>{
        return this.dao.getByJobId({jobId});
    }
    deleteJobProductById = (id) =>{
        return this.delete(id)
    }
}