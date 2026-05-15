import CustomRouter from "../../utils/CustomRouter.util.js";
import { 
    createJob, 
    readJob,
    readJobById,
    readJobByIdPopulated,
    readJobPopulatedPaginated,
    updateJob, 
    destroyJobById
} from "../../controllers/jobs.controllers.js";
import checkConcurrency from "../../middlewares/checkConcurrency.js";


class JobsApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createJob);
        this.read("/", ["USER", "ADMIN"], readJob);
        this.read("/populated/:id", ["USER", "ADMIN"], readJobByIdPopulated);
        this.read("/paginated/", ["USER", "ADMIN"], readJobPopulatedPaginated);
        this.read("/:id", ["USER", "ADMIN"], readJobById);
        this.update("/:id", ["USER", "ADMIN"], checkConcurrency, updateJob);
        this.destroy("/:id", ["USER", "ADMIN"], destroyJobById);
    };
}

const jobsApiRouter = new JobsApiRouter();
export default jobsApiRouter.getRouter();