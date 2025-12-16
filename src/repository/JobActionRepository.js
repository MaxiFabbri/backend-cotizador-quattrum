
import GenericRepository from "./GenericRepository.js";

export default class JobActionsRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    get = (params) => {
        return this.dao.get(params);
    }
}