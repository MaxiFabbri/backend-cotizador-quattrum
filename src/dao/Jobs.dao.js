import jobsModel from "./models/Job.js";

export default class jobs {
  get = (params) => {
    return jobsModel.find(params);
  };

  getBy = (params) => {
    return jobsModel.findOne(params);
  };

  getOneJobByIdwithCustomerDetails = (id) => {
    return jobsModel
      .findOne({ _id: id })
      .populate({
        path: "customerId",
        populate: {
          path: "customerPaymentMethodId",
        },
      })
      .populate({
        path: "paymentMethodId",
      });
  };

  getJobsPopulatedFilteredPaginated = async (params, options) => {
    const { page, limit, sort } = options;
    const pipeline = [];

    // Lookup de cliente
    pipeline.push({
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "customer",
      },
    });
    // Unwind del cliente
    pipeline.push({
      $unwind: {
        path: "$customer",
        preserveNullAndEmptyArrays: true,
      },
    });
    // Lookup de productos
    pipeline.push({
      $lookup: {
        from: "jobproducts",
        localField: "_id",
        foreignField: "jobId",
        as: "jobProducts",
      },
    });
    // Lookup de procesos
    pipeline.push({
      $lookup: {
        from: "jobprocesses",
        let: { jobId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$jobId", "$$jobId"] } } },
          {
            $lookup: {
              from: "suppliers",
              let: { supplierId: "$supplierId" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$supplierId"] } } },
                { $project: { _id: 0, supplierName: "$name" } }, // renombramos aquí
              ],
              as: "supplier",
            },
          },
          { $unwind: { path: "$supplier", preserveNullAndEmptyArrays: true } },
          // opcional: mover supplierName al nivel raíz del jobProcess
          {
            $addFields: {
              supplierName: "$supplier.supplierName",
            },
          },
          { $project: { supplier: 0 } }, // si no querés el objeto supplier completo
          { $sort: { order: 1 } },
        ],
        as: "jobProcesses",
      },
    });

    // Filtro por nombre parcial (name) y estado (quoteStatus)
    const matchConditions = [];

    if (params.name) {
      matchConditions.push({
        $or: [
          { "customer.name": params.name },
          { "customer.code": params.name },
          { "jobProducts.jobProductDescription": params.name },
          {
            "jobProcesses": { $elemMatch: { supplierName: params.name } },
          },
        ],
      });
    }

    if (params.status) {
      matchConditions.push({ jobStatus: params.status });
    }

    // Boolean flags
    const boolParams = [
      "hasInvoicesPendingIssuance",
      "hasCollectionsPending",
      "hasPurchaseInvocesToRecieve",
      "hasPaymentsToMake",
    ];

    boolParams.forEach((param) => {
      if (params[param] === true || params[param] === "true") {
        matchConditions.push({ [param]: true });
      }
    });

    if (matchConditions.length > 0) {
      pipeline.push({ $match: { $and: matchConditions } });
    }

    // Ordenar
    pipeline.push({ $sort: sort });

    // Paginación
    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: limit });

    // Ejecutar agregación
    const jobs = await jobsModel.aggregate(pipeline);

    // Obtener total para paginación
    const countPipeline = [
      ...pipeline.filter((stage) => !stage.$skip && !stage.$limit),
    ];
    countPipeline.push({ $count: "total" });
    const totalResult = await jobsModel.aggregate(countPipeline);
    const totalDocs = totalResult[0]?.total || 0;

    return {
      docs: jobs,
      totalDocs,
      page,
      limit,
      hasNextPage: page * limit < totalDocs,
      hasPrevPage: page > 1,
      totalPages: Math.ceil(totalDocs / limit),
    };
  };

  save = (doc) => {
    return jobsModel.create(doc);
  };

  update = (id, doc) => {
    return jobsModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return jobsModel.findByIdAndDelete(id);
  };
}
