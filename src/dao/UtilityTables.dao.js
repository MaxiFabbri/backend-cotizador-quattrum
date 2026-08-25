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
}
