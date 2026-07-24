import { getAccessToken } from "./auth.js";
import envUtil from "../utils/env.util.js";

export async function sendPresupuesto(data) {
  console.log("Send Presupuesto data: ", data);
  const token = await getAccessToken();
  console.log("Token obtenido");
  const url = `${envUtil.XUBIO_BASE_URL}/presupuestoBean`;
  console.log("url a donde consulta: ", url);

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
    console.log("Respuesta de Xubio:", result);
    return result;
  } catch (err) {
    console.error("Error en sendPresupuesto:", err);
    return err;
  }
}
