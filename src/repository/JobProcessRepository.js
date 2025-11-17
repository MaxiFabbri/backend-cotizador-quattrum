import GenericRepository from "./GenericRepository.js";

export default class JobProcessRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    getJobProcessById = (id) =>{
        return this.getBy({_id:id})
    }
    getJobProcessByJobProductId = (jobProductId) =>{
        return this.dao.getByJobProductId({jobProductId});
    }
    deleteJobProcessById = (id) =>{
        return this.delete(id)
    }
}