import CustomRouter from "../../utils/CustomRouter.util.js";
import { 
    createJob, 
    readJob,
    readJobById,
    updateJob, 
    destroyJobById
} from "../../controllers/jobs.controllers.js";

class JobsApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createJob);
        this.read("/:id", ["USER", "ADMIN"], readJobById);
        this.read("/", ["USER", "ADMIN"], readJob);
        this.update("/:id", ["USER", "ADMIN"], updateJob);
        this.destroy("/:id", ["USER", "ADMIN"], destroyJobById);
    };
}

const jobsApiRouter = new JobsApiRouter();
export default jobsApiRouter.getRouter();