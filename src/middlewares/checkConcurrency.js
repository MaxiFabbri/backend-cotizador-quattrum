import Job from "../dao/models/Job.js";

async function checkConcurrency (req, res, next) {
  try {
    const { id } = req.params;
    const clientUpdatedAt = req.body.updatedAt;

    const job = await Job.findById(id);
    console.log(
      "Job en la DB: ",
      job.updatedAt,
      " - Cliente updated At: ",
      clientUpdatedAt
    );
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Comparar timestamps
    if (
      new Date(clientUpdatedAt).getTime() !== new Date(job.updatedAt).getTime()
    ) {
      return res.status(409).json({
        error: "Conflict detected",
        message: "El job fue modificado por otro usuario",
        currentUpdatedAt: job.updatedAt,
      });
    }

    // Si coincide, seguimos al controlador
    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default checkConcurrency