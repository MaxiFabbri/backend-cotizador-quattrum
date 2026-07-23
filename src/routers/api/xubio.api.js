import CustomRouter from "../../utils/CustomRouter.util.js";
import { createPresupuesto, getPresupuestos } from "../../controllers/xubio.controllers.js";

class XubioApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init()
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createPresupuesto);
        this.read("/", ["USER", "ADMIN"], getPresupuestos);
    }
}

const xubioApiRouter = new XubioApiRouter();
export default xubioApiRouter.getRouter();
