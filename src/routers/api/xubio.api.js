import CustomRouter from "../../utils/CustomRouter.util.js";
import { createPresupuesto } from "../../controllers/xubio.controllers.js";

class XubioApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init()
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createPresupuesto);
    }
}

const xubioApiRouter = new XubioApiRouter();
export default xubioApiRouter.getRouter();
