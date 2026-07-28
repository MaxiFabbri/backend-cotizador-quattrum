import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  createPresupuesto,
  readCustomerByCuit,
} from "../../controllers/xubio.controllers.js";

class XubioApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init()
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createPresupuesto);
        this.read("/customer/:cuit", ["USER", "ADMIN"], readCustomerByCuit);
    }
}

const xubioApiRouter = new XubioApiRouter();
export default xubioApiRouter.getRouter();
