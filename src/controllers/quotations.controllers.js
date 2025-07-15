import { quotationService, customerService, productService, processService, usersActionsService } from "../services/index.service.js";


async function createQuotation(req, res) {
    const message = "QUOTATION CREATED";
    const userId = req.user._id; // Obtengo el userId del token
    const data = {
        ...req.body,
        lastModifiedBy: userId
    }
    const response = await quotationService.create(data);
    if (!response) {
        return res.status(400).json({ message: "Error creating quotation" });
    }
    // preparo la informacion
    const action = {
        userId: userId,
        action: "CREATE",
        quotationModifiedId: response._id,
        oprationSucces: true
    };
    // grabo el movimiento
    await usersActionsService.create(action);

    return res.status(201).json({ response, message });
}
async function readQuotation(req, res) {
    const message = "QUOTATIONS FOUND";
    const response = await quotationService.getAll();
    return res.status(200).json({ response, message });
}
async function readQuotationByIdPopulated(req, res) {
    const { id } = req.params;
    const message = "QUOTATIONS FOUND";
    const response = await quotationService.getQuotationsByIdPopulated(id);
    return res.status(200).json({ response, message });
}
async function readQuotationPopulatedByCustomerName(req, res) {
    const name = req.query.name;
    try {
        // Busco el customer por name recibido en la consulta
        const customers = await customerService.getCustomerByNameOrCode(name);
        // Recivo los customers que coinciden con el name
        const customerIds = customers.map(customer => customer._id);
        const response = await quotationService.getQuotationsFilteredByCustomerIdsPopulated(customerIds)

        const message = "QUOTATIONS FOUND";
        return res.status(200).json({ response, message });

    } catch (error) {
        console.error('Error al obtener cotizaciones:', error);
        return [];
    }
}
async function readQuotationPopulatedFiltered(req, res) {
    const name = req.query.name;
    const quoteStatus = req.query.status || {$in: ['Cotizado', 'Aprobado', 'En Producción', 'Entregado']};
    console.log("Filtered Route Data: ", name, quoteStatus)
    try {
        // Busco el customer por name recibido en la consulta
        const customers = await customerService.getCustomerByNameOrCode(name);
        // Recivo los customers que coinciden con el name
        const customerIds = customers.map(customer => customer._id);
        // Busco las cotizaciones por customerIds y quoteStatus
        const response = await quotationService.getQuotationsFilteredPopulated(customerIds, quoteStatus)
        const message = "QUOTATIONS FOUND";
        return res.status(200).json({ response, message });
    } catch (error) {
        console.error('Error al obtener cotizaciones:', error);
        return [];
    }
}

async function readQuotationPopulated(req, res) {
    const message = "QUOTATIONS FOUND";
    const response = await quotationService.getAllQuotationsPopulated();
    return res.status(200).json({ response, message });
}

async function readQuotationById(req, res) {
    const { id } = req.params;
    const message = "QUOTATION FOUND";
    const response = await quotationService.getQuotationById(id);
    return res.status(200).json({ response, message });
}

async function updateQuotation(req, res) {
    const userId = req.user._id; // Obtengo el userId del token
    const { id } = req.params;
    const data = {
        ...req.body,
        lastModifiedBy: userId
    }
    const message = "QUOTATION UPDATED";
    const response = await quotationService.update(id, data);
    if (!response) {
        return res.status(404).json({ message: "Quotation not found" });
    }
    // Si se actualizó correctamente, Grabo el movimiento en UserActions
    // preparo la informacion
    const action = {
        userId: userId,
        action: "UPDATE",
        quotationModifiedId: id,
        oprationSucces: true
    };
    // grabo el movimiento
    await usersActionsService.create(action);
    
    return res.status(200).json({ response, message });
}

async function destroyQuotation(req, res) {
    const { id } = req.params;
    const userId = req.user._id; // Obtengo el userId del token
    // Busco los products con este quotation id
    const responseProducts = await productService.getProductByQuotationId(id);
    responseProducts.map( async (product) => {
        // elimino los procesos de ese Producto
        const resProcDel = await processService.deleteAll({"productId": product._id})
        // elimino el producto
        await productService.delete(product._id)
    })
    const message = "QUOTATION DELETED";
    const response = await quotationService.delete(id);
    if (!response) {
        return res.status(404).json({ message: "Quotation not found" });
    }
    // preparo la informacion
    const action = {
        userId: userId,
        action: "DELETE",
        quotationModifiedId: id,
        oprationSucces: true
    };
    // grabo el movimiento
    await usersActionsService.create(action);

    return res.status(200).json({ response, message });
}


export {
    createQuotation, 
    readQuotation,
    readQuotationPopulated,
    readQuotationPopulatedFiltered,
    readQuotationByIdPopulated,
    readQuotationPopulatedByCustomerName,
    readQuotationById,
    updateQuotation, 
    destroyQuotation 
}