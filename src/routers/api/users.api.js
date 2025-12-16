import CustomRouter from "../../utils/CustomRouter.util.js";
import {
    createUser,
    readUsers,
    readUserById,
    readUserByEmail,
    updateUser,
    destroyUser
} from "../../controllers/users.controllers.js"

class UsersApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["ADMIN"], createUser);
        this.read("/check-email", ["ADMIN"], readUserByEmail)
        this.read("/:id", ["USER", "ADMIN"], readUserById);
        this.read("/", ["USER", "ADMIN"], readUsers);
        this.update("/:id", ["USER", "ADMIN"], updateUser);
        this.destroy("/:id", ["USER", "ADMIN"], destroyUser);      
    };
}

const usersApiRouter = new UsersApiRouter();
export default usersApiRouter.getRouter();