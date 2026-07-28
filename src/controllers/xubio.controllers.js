import { sendPresupuesto, getCustomerId, getCustomerData } from "../api/xubio.js"

export async function createPresupuesto(req, res) {
    const message = "PRESUPUESTO CREATED";
    const response = await sendPresupuesto(req.body);
    return res.status(201).json({ response, message });
}

export async function readCustomerByCuit(req, res) {
    const cuit = req.params.cuit;
    console.log("cuit: ", cuit);
    const message = "CUSTOMER FOUND";
    const id = await getCustomerId(cuit);
    console.log("Respuesta de id controller: ", id);
    const response = await getCustomerData(id)
    console.log("Customer data: ", response)


    return res.status(201).json({ response, message });
}
