import GenericRepository from "./GenericRepository.js";

export default class JobRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    getJobById = (id) =>{
        return this.getBy({_id:id})
    }
    deleteJobById = (id) =>{
        return this.delete(id)
    }
}