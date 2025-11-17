import { jobProcessService } from "../services/index.service.js";

async function createJobProcess(req, res) {
    const message = "JOB PROCESS CREATED";
    const userId = req.user._id; // Obtengo el userId del token
    const data = {
        ...req.body
    }
    const response = await jobProcessService.create(data);
    if (!response) {
        return res.status(400).json({ message: "Error creating Job Process" });
    }
    return res.status(201).json({ response, message });
}
async function readJobProcess(req, res) {
    const message = "JOB PROCESS FOUND";
    const response = await jobProcessService.getAll();
    return res.status(200).json({ response, message });
}
async function readJobProcessById(req, res) {
    const { id } = req.params;
    const message = "JOB PROCESS FOUND";
    const response = await jobProcessService.getJobProcessById(id);
    return res.status(200).json({ response, message });
}
async function readJobProcessByJobProductId(req, res) {
    const { jobProductId } = req.params;
    console.log("jobProductId:", jobProductId);
    const message = "PRODUCT FOUND";
    const response = await jobProcessService.getJobProcessByJobProductId(jobProductId);
    return res.status(200).json({ response, message });
}
async function updateJobProcess(req, res) {
    const userId = req.user._id; // Obtengo el userId del token
    const { id } = req.params;
    const data = {
        ...req.body
    }
    const message = "JOB PROCESS UPDATED";
    const response = await jobProcessService.update(id, data);
    if (!response) {
        return res.status(404).json({ message: "Job Process not found" });
    }
    return res.status(200).json({ response, message });
}

async function destroyJobProcessById(req, res) {
    const { id } = req.params;
    const message = "JOB PROCESS DELETED";
    const response = await jobProcessService.deleteJobProcessById(id);
    if (!response) {
        return res.status(404).json({ message: "Job Process not found" });
    }
    return res.status(200).json({ response, message });
}

export {
    createJobProcess, 
    readJobProcess,
    readJobProcessById,
    readJobProcessByJobProductId,
    updateJobProcess, 
    destroyJobProcessById
}