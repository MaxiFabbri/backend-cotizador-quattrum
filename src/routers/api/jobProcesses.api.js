import CustomRouter from "../../utils/CustomRouter.util.js";
import { 
    createJobProcess, 
    readJobProcess,
    readJobProcessById,
    readJobProcessByJobProductId,
    updateJobProcess, 
    destroyJobProcessById
} from "../../controllers/jobProcesses.controllers.js";

class JobProcessesApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createJobProcess);
        // this.read("/:id", ["USER", "ADMIN"], readJobProcessById);
        this.read("/", ["USER", "ADMIN"], readJobProcess);
        this.read("/:jobProductId", ["USER", "ADMIN"], readJobProcessByJobProductId);
        this.update("/:id", ["USER", "ADMIN"], updateJobProcess);
        this.destroy("/:id", ["USER", "ADMIN"], destroyJobProcessById);
    };
}

const jobProcessesApiRouter = new JobProcessesApiRouter();
export default jobProcessesApiRouter.getRouter();