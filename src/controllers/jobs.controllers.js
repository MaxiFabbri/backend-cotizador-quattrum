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
async function readJobByIdPopulated(req, res) {
    const { id } = req.params;
    const message = "QUOTATIONS FOUND";
    const response = await jobService.getJobByIdPopulated(id);
    return res.status(200).json({ response, message });
}
async function readJobPopulatedPaginated(req, res) {
    const { name, page, limit } = req.query;
    const jobStatus = req.query.status || {$in: ['Aprobado', 'En Producción', 'Entregado']};
    const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 50,
        sort: { date: -1 }
    };
    const message = "CUSTOMERS POPULATED PAGINATED FOUND";

    try {
        // Busco las cotizaciones por customerIds y jobStatus
        const response = await jobService.getJobsPopulatedFilteredPaginated(name, jobStatus, options);
        const message = "JOBS FOUND";
        return res.status(200).json({ response, message });
    } catch (error) {
        console.error('Error al obtener trabajos:', error);
        return [];
    }

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
    readJobByIdPopulated,
    readJobPopulatedPaginated,
    updateJob, 
    destroyJobById
}