import { jobService, jobProductService, jobProcessService } from "../services/index.service.js";

async function createJob(req, res) {
    const message = "JOB CREATED";
    const userId = req.user._id; // Obtengo el userId del token
    const data = {
        ...req.body
    }
    const response = await jobService.create(data);
    if (!response) {
        return res.status(400).json({ message: "Error creating Job" });
    }
    return res.status(201).json({ response, message });
}
async function readJob(req, res) {
    const message = "JOBS FOUND";
    const response = await jobService.getAll();
    return res.status(200).json({ response, message });
}
async function readJobById(req, res) {
    const { id } = req.params;
    const message = "JOB FOUND";
    const response = await jobService.getJobById(id);
    return res.status(200).json({ response, message });
}
async function updateJob(req, res) {
    const userId = req.user._id; // Obtengo el userId del token
    const { id } = req.params;
    const data = {
        ...req.body
    }
    const message = "JOB UPDATED";
    const response = await jobService.update(id, data);
    if (!response) {
        return res.status(404).json({ message: "JOB not found" });
    }
    
    return res.status(200).json({ response, message });
}

async function destroyJobById(req, res) {
    const { id } = req.params;
    const message = "JOB DELETED";
    const response = await jobService.deleteJobById(id);
    if (!response) {
        return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json({ response, message });
}

export {
    createJob, 
    readJob,
    readJobById,
    updateJob, 
    destroyJobById
}