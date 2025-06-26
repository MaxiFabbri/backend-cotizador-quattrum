import { supplierService } from "../services/index.service.js";


async function createSupplier(req, res) {
    const message = "SUPPLIER CREATED";
    const data = req.body;
    const response = await supplierService.create(data);
    return res.status(201).json({ response, message });
}
async function readSupplier(req, res) {
    const message = "SUPPLIER FOUND";
    const response = await supplierService.getAll();
    return res.status(200).json({ response, message });
}
async function readSupplierById(req, res) {
    const { id } = req.params;
    const message = "SUPPLIER FOUND";
    const response = await supplierService.getSupplierByIdPopulated(id);
    return res.status(200).json({ response, message });
}
async function readSupplierByNameOrCode(req, res) {
    const { name } = req.body;
    const message = "SUPPLIER FOUND";
    const response = await supplierService.getSupplierByName(name);
    return res.status(200).json({ response, message });
}

async function updateSupplier(req, res) {
    const { id } = req.params;
    const data = req.body;
    const message = "SUPPLIER UPDATED";
    const response = await supplierService.update(id, data);
    return res.status(200).json({ response, message });
}
async function destroySupplier(req, res) {
    const { id } = req.params;
    const message = "SUPPLIER DELETED";
    const response = await supplierService.delete(id);
    return res.status(200).json({ response, message });
}
async function readSupplierPopulated(req, res) {
    const { name } = req.query;
    const message = "SUPPLIER POPULATED FOUND";
    const response = await supplierService.getSomeSuppliersPopulated(name);
    return res.status(200).json({ response, message });
}
async function readSupplierByName(req, res) {
    const message = "SUPPLIER FOUND";
    const { name } = req.params;
    const response = await supplierService.getBy({"name": name});
    return res.status(200).json({ response, message });
}


export {
    createSupplier,
    readSupplier,
    readSupplierById,
    readSupplierByName,
    readSupplierByNameOrCode,
    readSupplierPopulated,
    updateSupplier,
    destroySupplier
}