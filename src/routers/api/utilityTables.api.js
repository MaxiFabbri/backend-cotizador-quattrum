import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  readUtilityTables,
  readUtilityTableById,
  createUtilityTable,
  updateUtilityTable,
  deleteUtilityTable,
} from "../../controllers/utilityTables.controllers.js";

class UtilityTablesApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    // Obtener todas las tablas
    this.read("/", ["PUBLIC", "ADMIN"], readUtilityTables);

    // Obtener una tabla por ID
    this.read("/:id", ["PUBLIC", "ADMIN"], readUtilityTableById);

    // Crear una nueva tabla
    this.create("/", ["ADMIN"], createUtilityTable);

    // Actualizar una tabla existente
    this.update("/:id", ["ADMIN"], updateUtilityTable);

    // Eliminar una tabla
    this.destroy("/:id", ["ADMIN"], deleteUtilityTable);
  };
}

const utilityTablesApiRouter = new UtilityTablesApiRouter();
export default utilityTablesApiRouter.getRouter();
