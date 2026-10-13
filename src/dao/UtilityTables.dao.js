import mongoose from "mongoose";
import UtilityTableModel from "./models/UtilityTable.js";

export default class UtilityTables {
  // Obtener todas las tablas con filtros opcionales
  get = (params = {}) => {
    return UtilityTableModel.find(params);
  };

  // Obtener una sola tabla por criterio
  getBy = (params) => {
    return UtilityTableModel.findOne(params);
  };

  // Guardar una nueva tabla
  save = (doc) => {
    return UtilityTableModel.create(doc);
  };

  // Actualizar una tabla por ID
  update = (id, doc) => {
    return UtilityTableModel.findByIdAndUpdate(
      id,
      { $set: doc },
      { new: true }
    );
  };

  // Eliminar una tabla por ID
  delete = (id) => {
    return UtilityTableModel.findByIdAndDelete(id);
  };

  // Cambiar el default de forma atómica para toda la colección
  setDefault = async (id) => {
    const session = await mongoose.startSession();
    let updatedTable = null;

    try {
      await session.withTransaction(async () => {
        const targetTable = await UtilityTableModel.findById(id).session(session);
        if (!targetTable) return;

        await UtilityTableModel.updateMany(
          { isDefault: true },
          { $set: { isDefault: false } },
          { session }
        );

        updatedTable = await UtilityTableModel.findByIdAndUpdate(
          id,
          { $set: { isDefault: true } },
          { new: true, runValidators: true, session }
        );
      });

      return updatedTable;
    } finally {
      await session.endSession();
    }
  };
}
