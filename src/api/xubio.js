import { getAccessToken } from "./auth.js";
import envUtil from "../utils/env.util.js";

export async function sendPresupuesto(data) {
  console.log("Send Presupuesto data: ", data);
  const token = await getAccessToken();
  console.log("Token obtenido");
  const url = `${envUtil.XUBIO_BASE_URL}/presupuestoBean`;

  try {
    const response = await fetch(url, {
      method: "POST", // cambiamos a POST
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), // acá va tu objeto preparado
    });
    
    if (!response.ok) {
      throw new Error(`Error enviando presupuesto: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error en sendPresupuesto:", err);
    return err;
  }
}

export async function getCustomerId(cuit) {
  const token = await getAccessToken();
  console.log("Token obtenido");
  const url = `${envUtil.XUBIO_BASE_URL}/clienteBean?numeroIdentificacion=${cuit}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        status: response.status,
        id: 0,
        message: `Error en la consulta: ${response.status} - ${response.statusText}`,
      };
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length !== 1) {
      return {
        status: 404,
        id: 0,
        message: "No se encontró ningún cliente con ese CUIT",
      };
    }

    const result = data[0].cliente_id;
    return {
      status: 200,
      id: result,
      message: "CUSTOMER FOUND"
    };
  } catch (err) {
    console.error("Error en getCustomerId:", err);
    return {
      status: 500,
      id: 0,
      message: "Error interno al consultar el cliente",
    };
  }
}


export async function getCustomerData(id) {
  const token = await getAccessToken();
  console.log("Token obtenido");
  const url = `${envUtil.XUBIO_BASE_URL}/clienteBean/${id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status} - ${response.statusText}`
      );
    }
    const result = await response.json();
    console.log("Result en xubio: ", result);

    return result;
  } catch (err) {
    console.error("Error en getCustomerId:", err);
    throw err;
  }
}
