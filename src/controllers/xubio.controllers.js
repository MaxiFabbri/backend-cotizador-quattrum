import { sendPresupuesto } from "../api/xubio.js"

export async function createPresupuesto(req, res) {
    const message = "PRESUPUESTO CREATED";
    const response = await sendPresupuesto(req.body);
    return res.status(201).json({ response, message });
}
