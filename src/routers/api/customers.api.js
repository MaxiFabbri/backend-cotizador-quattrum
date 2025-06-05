import CustomRouter from "../../utils/CustomRouter.util.js";
import { 
    createCustomer, 
    readCustomer,
    readCustomerPopulated,
    readCustomerById,
    readCustomerByName,
    readCustomerByNameOrCode,
    updateCustomer, 
    destroyCustomer 
} from "../../controllers/customers.controllers.js";


class CustomersApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/name", ["USER", "ADMIN"], readCustomerByNameOrCode);
        this.create("/", ["USER", "ADMIN"], createCustomer);
        this.read("/", ["USER", "ADMIN"], readCustomer);
        this.read("/name/:name", ["USER", "ADMIN"], readCustomerByName);
        this.read("/populated/name", ["USER", "ADMIN"], readCustomerPopulated);
        this.read("/:id", ["USER", "ADMIN"], readCustomerById);
        this.update("/:id", ["USER", "ADMIN"], updateCustomer);
        this.destroy("/:id", ["USER", "ADMIN"], destroyCustomer);      
    };
}

const customersApiRouter = new CustomersApiRouter();
export default customersApiRouter.getRouter();