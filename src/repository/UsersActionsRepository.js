
import GenericRepository from "./GenericRepository.js";

export default class UsersActionsRepository extends GenericRepository{
    constructor(dao){
        super(dao);
    }
    get = (params) => {
        return this.dao.get(params);
    }
}