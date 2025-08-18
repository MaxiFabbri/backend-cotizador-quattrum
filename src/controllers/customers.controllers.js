import { customerService } from "../services/index.service.js";


async function createCustomer(req, res) {
    const message = "CUSTOMER CREATED";
    const data = req.body;
    const response = await customerService.create(data);
    return res.status(201).json({ response, message });
}
async function readCustomer(req, res) {
    const message = "CUSTOMERS FOUND";
    const response = await customerService.getAll();
    return res.status(200).json({ response, message });
}
async function readCustomerPopulated(req, res) {
    const name = req.query.name;
    console.log("Customer Controller readCustomerPopulated: ",name)
    const message = "CUSTOMERS POPULATED FOUND";
    const response = await customerService.getSomeCustomersPopulated(name);
    return res.status(200).json({ response, message });
}
async function readCustomerPopulatedPaginated(req, res) {
    const { filter, page, limit } = req.query;
    console.log("Customers Controlers req: ",req.query);
    
    const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        sort: { name: 1 }
    };
    const message = "CUSTOMERS POPULATED PAGINATED FOUND";
    const response = await customerService.getCustomersPopulatedPaginated({filter},options);
    return res.status(200).json({ response, message });
}

async function readCustomerById(req, res) {
    const { id } = req.params;
    const message = "CUSTOMER FOUND";
    const response = await customerService.getCustomerByIdPopulated(id);
    return res.status(200).json({ response, message });
}
async function readCustomerByName(req, res) {
    const { name } = req.params;
    var message = "CUSTOMERS FOUND";
    const response = await customerService.getBy({"name":name});
    if (!response) { 
        message = "CUSTOMER NOT FOUND";
    }
    return res.status(200).json({ response, message });
}
async function readCustomerByNameOrCode(req, res) {
    const { name } = req.body;
    const message = "CUSTOMERS FOUND";
    const response = await customerService.getCustomerByNameOrCode(name);
    return res.status(200).json({ response, message });
}
async function updateCustomer(req, res) {
    const { id } = req.params;
    const data = req.body;
    const message = "CUSTOMER UPDATED";
    const response = await customerService.update(id, data);
    return res.status(200).json({ response, message });
}
async function destroyCustomer(req, res) {
    const { id } = req.params;
    const message = "CUSTOMER DELETED";
    const response = await customerService.delete(id);
    return res.status(200).json({ response, message });
}


export {
    createCustomer, 
    readCustomer,
    readCustomerPopulated,
    readCustomerById,
    readCustomerByName,
    readCustomerByNameOrCode,
    readCustomerPopulatedPaginated,
    updateCustomer, 
    destroyCustomer 
}