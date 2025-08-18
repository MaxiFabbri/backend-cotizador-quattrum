import CustomRouter from "../../utils/CustomRouter.util.js";
import { 
    createSupplier,
    readSupplier,
    readSupplierById,
    readSupplierByNameOrCode,
    readSupplierPopulated,
    readSupplierByName,
    readSupplierPopulatedPaginated,
    updateSupplier,
    destroySupplier
} from "../../controllers/suppliers.controllers.js";
    


class SuppliersApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/name", ["USER", "ADMIN"], readSupplierByNameOrCode);
        this.create("/", ["USER", "ADMIN"], createSupplier);
        this.read("/", ["USER", "ADMIN"], readSupplier);
        this.read("/name/:name", ["USER", "ADMIN"], readSupplierByName);
        this.read("/populated/name", ["USER", "ADMIN"], readSupplierPopulated);
        this.read("/paginated", ["USER", "ADMIN"], readSupplierPopulatedPaginated);
        this.read("/:id", ["USER", "ADMIN"], readSupplierById);
        this.update("/:id", ["USER", "ADMIN"], updateSupplier);
        this.destroy("/:id", ["USER", "ADMIN"], destroySupplier);      
    };
}

const suppliersApiRouter = new SuppliersApiRouter();
export default suppliersApiRouter.getRouter();