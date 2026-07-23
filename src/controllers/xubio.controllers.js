import { readPresupuestos, sendPresupuesto } from "../api/xubio.js"

async function createPresupuesto(req, res) {
    console.log("Create Presupuesto: ", req)
    return
}

async function getPresupuestos(req, res) {
    console.log("Read Presupuestos: ", req.body)
    const response = await readPresupuestos();
    console.log("Read presupuestos response: ", response)
    return
}

export {
    createPresupuesto,
    getPresupuestos
}