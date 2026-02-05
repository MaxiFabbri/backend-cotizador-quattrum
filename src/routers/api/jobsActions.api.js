import CustomRouter from "../../utils/CustomRouter.util.js";
import { readJobsActions, readJobsActionsByJobId, readJobsActionsByUserId } from "../../controllers/jobActions.controllers.js";
	

class JobsActionsApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.read("/", ["PUBLIC", "ADMIN"], readJobsActions);
        this.read("/user/:id", ["PUBLIC", "ADMIN"], readJobsActionsByJobId);
        this.read("/job/:id", ["PUBLIC", "ADMIN"], readJobsActionsByUserId);
    };
}

const jobsActionsApiRouter = new JobsActionsApiRouter();
export default jobsActionsApiRouter.getRouter();