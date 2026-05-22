// import { name } from 'faker/lib/locales/az/index.js';
import quotationModel from "./models/Quotation.js";

export default class quotations {
  get = (params) => {
    return quotationModel.find(params);
  };

  getQuotationsWithCustomerDetails = () => {
    return quotationModel.find().populate({
      path: "customerId",
      populate: {
        path: "customerPaymentMethodId",
      },
    });
  };

  getOneQuotationByIdwithCustomerDetails = (id) => {
    return quotationModel
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

  getQuotationsFilteredPopulated = (query) => {
    const response = quotationModel
      .find(query)
      .populate({
        path: "customerId",
        populate: {
          path: "customerPaymentMethodId",
        },
      })
      .sort({ date: -1 })
      .limit(100);
    return response;
  };

  getQuotationsFilteredPaginated = (params, options) => {
    const finalOptions = {
      ...options,
      sort: { date: -1 },
      populate: {
        path: "customerId",
        populate: {
          path: "customerPaymentMethodId",
          select: "customer_payment_description",
        },
      },
    };

    return quotationModel.paginate(params, finalOptions);
  };

  getQuotationsPopulatedFilteredPaginated = async (params, options) => {
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
    pipeline.push({
      $unwind: {
        path: "$customer",
        preserveNullAndEmptyArrays: true,
      },
    });
    // lookup de products
    pipeline.push({
      $lookup: {
        from: "products",
        localField: "_id", // campo en la colección principal
        foreignField: "quotationId", // campo en la colección relacionada
        as: "products",
      },
    });

    // Filtro por nombre parcial (name) y estado (quoteStatus)
    const matchConditions = [];

    if (params.name) {
      const regex = new RegExp(params.name, "i");
      matchConditions.push({
        $or: [
          { "customer.name": { $regex: regex } },
          { "customer.code": { $regex: regex } },
          { products: { $elemMatch: { productDescription: { $regex: regex } } } },
          { customerNote: { $regex: regex } }
        ],
      });
    }

    if (params.quoteStatus) {
      matchConditions.push({ quoteStatus: params.quoteStatus });
    }

    if (matchConditions.length > 0) {
      pipeline.push({ $match: { $and: matchConditions } });
    }

    // Order by date
    pipeline.push({ $sort: { date: -1 } });

    // Paginación
    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: limit });

    // Ejecutar agregación
    const quotations = await quotationModel.aggregate(pipeline);

    // Obtener total para paginación
    const countPipeline = [
      ...pipeline.filter((stage) => !stage.$skip && !stage.$limit),
    ];
    countPipeline.push({ $count: "total" });
    const totalResult = await quotationModel.aggregate(countPipeline);
    const totalDocs = totalResult[0]?.total || 0;

    return {
      docs: quotations,
      totalDocs,
      page,
      limit,
      hasNextPage: page * limit < totalDocs,
      hasPrevPage: page > 1,
      totalPages: Math.ceil(totalDocs / limit),
    };
  };

  getQuotationsByIdWithCustomerDetails = (query) => {
    const response = quotationModel
      .find(query)
      .populate({
        path: "customerId",
        populate: {
          path: "customerPaymentMethodId",
        },
      })
      .sort({ date: -1 })
      .limit(100);
    return response;
  };

  getBy = (params) => {
    return quotationModel.findOne(params);
  };

  save = (doc) => {
    return quotationModel.create(doc);
  };

  update = (id, doc) => {
    return quotationModel.findByIdAndUpdate(id, { $set: doc });
  };

  delete = (id) => {
    return quotationModel.findByIdAndDelete(id);
  };
}
