import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  readUtilityTables,
  readUtilityTableById,
  createUtilityTable,
  updateUtilityTable,
  setDefaultUtilityTable,
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

    // Esta ruta debe ir antes de la ruta genérica de actualización.
    this.update("/:id/default", ["ADMIN"], setDefaultUtilityTable);
    // Actualizar una tabla existente
    this.update("/:id", ["ADMIN"], updateUtilityTable);
  };
}

const utilityTablesApiRouter = new UtilityTablesApiRouter();
export default utilityTablesApiRouter.getRouter();
