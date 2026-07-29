import {
  sendPresupuesto,
  getCustomerId,
  getCustomerData,
} from "../api/xubio.js";

export async function createPresupuesto(req, res) {
  const message = "PRESUPUESTO CREATED";
  const response = await sendPresupuesto(req.body);
  return res.status(201).json({ response, message });
}

export async function readCustomerByCuit(req, res) {
  const cuit = req.params.cuit;
  console.log("cuit: ", cuit);
  try {
    const customerResponse = await getCustomerId(cuit);
    console.log("Respuesta de customerResponse controller: ", customerResponse);
    const { status, id, message } = customerResponse;

    if (status !== 200) {
      return res.status(status).json({
        message,
      });
    } else {
      const response = await getCustomerData(id);
      console.log("Customer data: ", response);

      return res.status(200).json({
        response,
        message: "CUSTOMER FOUND",
      });
    }
  } catch (error) {
    console.error("Error en readCustomerByCuit:", error);
    return res.status(500).json({
      message: "Error interno al consultar el cliente",
    });
  }
}
