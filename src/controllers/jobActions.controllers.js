import { jobActionsService } from "../services/index.service.js";


async function readJobsActions(req, res) {
    const message = "JOBS FOUND";
    const response = await jobsActionsService.getAll();
    return res.status(200).json({ response, message });
}

async function readJobsActionsByUserId(req, res) {
    const { id } = req.params;
    const message = "JOBS FOUND";
    const response = await jobsActionsService.get({"userId":id});
    return res.status(200).json({ response, message });
}

async function readJobsActionsByJobId(req, res) {
    const { id } = req.params;
    const message = "JOBS FOUND";
    const response = await jobsActionsService.get({"jobModifiedId":id});
    return res.status(200).json({ response, message });
}

export { readJobsActions, readJobsActionsByUserId, readJobsActionsByJobId };