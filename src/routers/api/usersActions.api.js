import CustomRouter from "../../utils/CustomRouter.util.js";
import { readUsersActions, readUsersActionsByUserId, readUsersActionsByQuotationId } from "../../controllers/usersActions.controllers.js";	

class UsersActionsApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.read("/", ["PUBLIC", "ADMIN"], readUsersActions);
        this.read("/user/:id", ["PUBLIC", "ADMIN"], readUsersActionsByUserId);
        this.read("/quotation/:id", ["PUBLIC", "ADMIN"], readUsersActionsByQuotationId);
    
    };
}

const usersActionsApiRouter = new UsersActionsApiRouter();
export default usersActionsApiRouter.getRouter();