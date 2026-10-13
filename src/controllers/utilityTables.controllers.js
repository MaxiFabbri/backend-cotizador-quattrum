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

// Crear una Tabla
async function createUtilityTable(req, res) {
  try {
    const { tableName, rows } = req.body;
    const currentDefault = await utilityTablesService.getBy({ isDefault: true });
    const response = await utilityTablesService.create({
      tableName,
      rows,
      // Mantiene un default al crear la primera tabla; las siguientes nacen false.
      isDefault: !currentDefault,
    });

    return res.status(201).json({ response, message: "UTILITY TABLE CREATED" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "A default utility table already exists." });
    }
    return res.status(500).json({ error: error.message });
  }
}

// Actualizar una tabla
async function updateUtilityTable(req, res) {
  try {
    const { id } = req.params;
    if (Object.hasOwn(req.body, "isDefault")) {
      return res.status(400).json({
        error: "Use PUT /utility-tables/:id/default to change the default table.",
      });
    }

    const response = await utilityTablesService.update(id, req.body);
    if (!response) return res.status(404).json({ error: "Utility table not found." });
    return res.status(200).json({ response, message: "UTILITY TABLE UPDATED" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function setDefaultUtilityTable(req, res) {
  try {
    const { id } = req.params;
    const response = await utilityTablesService.setDefault(id);
    if (!response) return res.status(404).json({ error: "Utility table not found." });
    return res.status(200).json({ response, message: "DEFAULT UTILITY TABLE UPDATED" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Could not set the default utility table." });
    }
    return res.status(500).json({ error: error.message });
  }
}

export {
  readUtilityTables,
  readUtilityTableById,
  createUtilityTable,
  updateUtilityTable,
  setDefaultUtilityTable,
};
