import { getAccessToken } from "./auth.js";
import envUtil from "../utils/env.util.js";

async function sendPresupuesto(req, res) {
  try {
    console.log("Create Presupuesto body:", req.body);
    // Por ahora no hacemos nada con sendPresupuesto
    res.end(); // cerramos la respuesta sin devolver nada
  } catch (err) {
    console.error("Error en createPresupuesto:", err);
    res.end();
  }
}

async function readPresupuestos() {
  console.log("Arrancando readPresupuestos");
  const token = await getAccessToken();
  console.log("Token obtenido");
  const url = `${envUtil.XUBIO_BASE_URL}/presupuestoBean`;
  console.log("url a donde consulta: ", url)
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error obteniendo presupuestos: ${response.statusText}`);
  }
  console.log("Response from Xubio API:", await response.clone().json()); // Log the response for debugging
  return response.json();
}

export { readPresupuestos, sendPresupuesto };
