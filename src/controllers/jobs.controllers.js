import {
  jobService,
  jobProductService,
  jobProcessService,
  jobActionsService,
} from "../services/index.service.js";

async function createJob(req, res) {
  const message = "JOB CREATED";
  const userId = req.user._id; // Obtengo el userId del token
  const data = {
    ...req.body,
  };
  const response = await jobService.create(data);
  if (!response) {
    return res.status(400).json({ message: "Error creating Job" });
  }

  // preparo la informacion
  const jobAction = {
    userId: userId,
    action: "CREATE",
    jobModifiedId: response._id,
    payload: data,
    oprationSuccess: true,
  };

  // grabo el movimiento
  await jobActionsService.create(jobAction);

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
  const message = "JOB FOUND";
  const response = await jobService.getJobByIdPopulated(id);
  return res.status(200).json({ response, message });
}
async function readJobPopulatedPaginated(req, res) {
  const { name, page, limit } = req.query;
  let jobStatus = req.query.status;
  if (jobStatus === "Todos") {
    // No aplicar filtro, dejar undefined
    jobStatus = undefined
  } else if (jobStatus === "ActivosProduccion") {
    jobStatus = {
      $in: ["Nuevo", "En Preparación", "En Producción", "Listo"],
    };
  } else {
    // Si no es "Todos", usar el valor o el conjunto por defecto
    jobStatus = jobStatus || {
      $in: ["Nuevo", "En Preparación", "En Producción", "Listo", "Entregado"],
    };
  }

  const filters = { status: jobStatus };
  if (name) filters.name = { $regex: name, $options: "i" };

  const boolParams = [
    "hasInvoicesPendingIssuance",
    "hasCollectionsPending",
    "hasPurchaseInvocesToRecieve",
    "hasPaymentsToMake",
  ];

  boolParams.forEach((param) => {
    if (req.query[param] === "true") {
      filters[param] = true;
    }
  });

  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 50,
    sort: { approvalDate: -1 },
  };


  const message = "CUSTOMERS POPULATED PAGINATED FOUND";

  try {
    // Busco las cotizaciones por customerIds y jobStatus
    const response = await jobService.getJobsPopulatedFilteredPaginated(
      filters,
      options
    );
    const message = "JOBS FOUND";
    return res.status(200).json({ response, message });
  } catch (error) {
    console.error("Error al obtener trabajos:", error);
    return [];
  }
}

async function updateJob(req, res) {
  const userId = req.user._id; // Obtengo el userId del token
  const { id } = req.params;
  const data = {
    ...req.body,
  };
  const message = "JOB UPDATED";
  const response = await jobService.update(id, data);
  if (!response) {
    return res.status(404).json({ message: "JOB not found" });
  }

  // preparo la informacion
  const jobAction = {
    userId: userId,
    action: "UPDATE",
    jobModifiedId: id,
    payload: data,
    oprationSuccess: true,
  };

  // grabo el movimiento
  await jobActionsService.create(jobAction);

  return res.status(200).json({ response, message });
}

async function destroyJobById(req, res) {
  const { id } = req.params;
  const message = "JOB DELETED";
  const response = await jobService.deleteJobById(id);
  if (!response) {
    return res.status(404).json({ message: "Job not found" });
  }

  // preparo la informacion
  const jobAction = {
    userId: userId,
    action: "DELETE",
    jobModifiedId: id,
    payload: data,
    oprationSuccess: true,
  };

  // grabo el movimiento
  await jobActionsService.create(jobAction);

  return res.status(200).json({ response, message });
}

export {
  createJob,
  readJob,
  readJobById,
  readJobByIdPopulated,
  readJobPopulatedPaginated,
  updateJob,
  destroyJobById,
};
