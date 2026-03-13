import { jobProductService, jobProcessService } from "../services/index.service.js";

async function createJobProduct(req, res) {
    const message = "JOB PRODUCT CREATED";
    const userId = req.user._id; // Obtengo el userId del token
    const data = {
        ...req.body
    }
    const response = await jobProductService.create(data);
    if (!response) {
        return res.status(400).json({ message: "Error creating Job Product" });
    }
    return res.status(201).json({ response, message });
}
async function readJobProduct(req, res) {
    const message = "JOB PRODUCTS FOUND";
    const response = await jobProductService.getAll();
    return res.status(200).json({ response, message });
}
async function readJobProductById(req, res) {
    const { id } = req.params;
    const message = "JOB PRODUCT FOUND";
    const response = await jobProductService.getJobProductById(id);
    return res.status(200).json({ response, message });
}
async function readJobProductByJobId(req, res) {
    const { jobId } = req.params;
    const message = "PRODUCT FOUND";
    const response = await jobProductService.getJobProductByJobId(jobId);
    return res.status(200).json({ response, message });
}
async function updateJobProduct(req, res) {
    const userId = req.user._id; // Obtengo el userId del token
    const { id } = req.params;
    const data = {
        ...req.body
    }
    const message = "JOB PRODUCT UPDATED";
    const response = await jobProductService.update(id, data);
    if (!response) {
        return res.status(404).json({ message: "Job Product not found" });
    }
    
    return res.status(200).json({ response, message });
}

async function destroyJobProductById(req, res) {
    const { id } = req.params;
    const message = "JOB PRODUCT DELETED";
    const response = await jobProductService.deleteJobProductById(id);
    if (!response) {
        return res.status(404).json({ message: "Job Product not found" });
    }
    return res.status(200).json({ response, message });
}

export {
    createJobProduct, 
    readJobProduct,
    readJobProductById,
    readJobProductByJobId,
    updateJobProduct, 
    destroyJobProductById
}