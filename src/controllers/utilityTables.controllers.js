import { utilityTablesService } from "../services/index.service.js";

// Obtener todas las tablas
async function readUtilityTables(req, res) {
  try {
    const message = "UTILITY TABLES FOUND";
    const response = await utilityTablesService.getAll();
    return res.status(200).json({ response, message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Obtener una tabla por ID
async function readUtilityTableById(req, res) {
  try {
    const { id } = req.params;
    const message = "UTILITY TABLE FOUND";
    const response = await utilityTablesService.getBy({ _id: id });
    return res.status(200).json({ response, message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// // Crear una nueva tabla
async function createUtilityTable(req, res) {
//   try {
//     const message = "UTILITY TABLE CREATED";
//     const response = await utilityTablesService.create(req.body);
//     return res.status(201).json({ response, message });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }
  try {
    const { tableName, rows, isDefault = false } = req.body;
    console.log("UT controllers: ", tableName, rows, isDefault)
    // Buscar si ya existe una default activa
    const currentDefault = await utilityTablesService.getBy({
      isDefault: true,
    });

    if (!currentDefault) {
      // No hay default → forzar esta como default
      const response = await utilityTablesService.create({
        tableName,
        rows,
        isDefault: true,
        isActive: true,
      });
      return res
        .status(201)
        .json({ response, message: "UTILITY TABLE CREATED AS DEFAULT" });
    }

    if (isDefault) {
      // Si viene marcada como default → desactivar la anterior
      await utilityTablesService.update(currentDefault._id, {
        isDefault: false,
      });
    }

    // Crear la nueva tabla
    const response = await utilityTablesService.create({
      tableName,
      rows,
      isDefault,
      isActive: true,
    });

    return res.status(201).json({ response, message: "UTILITY TABLE CREATED" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


// Actualizar una tabla
async function updateUtilityTable(req, res) {
  try {
    const { id } = req.params;
    const message = "UTILITY TABLE UPDATED";
    const response = await utilityTablesService.update(id, req.body);
    return res.status(200).json({ response, message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Eliminar una tabla
async function deleteUtilityTable(req, res) {
  try {
    const { id } = req.params;
    const message = "UTILITY TABLE DELETED";
    const response = await utilityTablesService.delete(id);
    return res.status(200).json({ response, message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export {
  readUtilityTables,
  readUtilityTableById,
  createUtilityTable,
  updateUtilityTable,
  deleteUtilityTable,
};
