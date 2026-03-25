
import GenericRepository from "./GenericRepository.js";

export default class MessagesRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
  get = (params) => {
    return this.dao.get(params);
  };
  getPendingByUserId(query) {
    return this.dao.getPendingByUserId(query);
  }
}