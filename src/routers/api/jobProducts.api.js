import CustomRouter from "../../utils/CustomRouter.util.js";
import { 
    createJobProduct, 
    readJobProduct,
    readJobProductById,
    readJobProductByJobId,
    updateJobProduct, 
    destroyJobProductById
} from "../../controllers/jobProducts.controllers.js";

class JobsProductsApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createJobProduct);
        this.read("/:id", ["USER", "ADMIN"], readJobProductById);
        this.read("/", ["USER", "ADMIN"], readJobProduct);
        this.read("/job/:jobId", ["USER", "ADMIN"], readJobProductByJobId);
        this.update("/:id", ["USER", "ADMIN"], updateJobProduct);
        this.destroy("/:id", ["USER", "ADMIN"], destroyJobProductById);
    };
}

const jobProductsApiRouter = new JobsProductsApiRouter();
export default jobProductsApiRouter.getRouter();