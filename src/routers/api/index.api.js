import CustomRouter from "../../utils/CustomRouter.util.js";
import sessionsApiRouter from "./sessions.api.js";
import usersApiRouter from "./users.api.js";
import generalParametersApiRouter from "./generalParameters.api.js";

import customerPaymentMethodsApiRouter from "./customerPaymentMethods.api.js";
import suppliersApiRouter from "./suppliers.api.js";
import supplierPaymentMethodsApiRouter from "./supplierPaymentMethods.api.js";
import customersApiRouter from "./customers.api.js";
import quotationsApiRouter from "./quotations.api.js";
import productsApiRouter from "./products.api.js";
import processesApiRouter from "./processes.api.js";
import usersActionsApiRouter from "./usersActions.api.js";
import jobsApiRouter from "./jobs.api.js";
import jobProductsApiRouter from "./jobProducts.api.js";
import jobProcessesApiRouter from "./jobProcesses.api.js";
import jobsActionsApiRouter from "./jobsActions.api.js";
import messagesApiRouter from "./messages.api.js";
import xubioApiRouter from "./xubio.api.js"


class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/users", ["PUBLIC"], usersApiRouter);
    this.use("/general-parameters", ["PUBLIC"], generalParametersApiRouter);
    this.use("/customers", ["PUBLIC"], customersApiRouter);
    this.use("/customer-payment-methods", ["PUBLIC"], customerPaymentMethodsApiRouter);
    this.use("/suppliers", ["PUBLIC"], suppliersApiRouter);
    this.use("/supplier-payment-methods", ["PUBLIC"], supplierPaymentMethodsApiRouter);
    this.use("/quotations", ["PUBLIC"], quotationsApiRouter);
    this.use("/products", ["PUBLIC"], productsApiRouter);
    this.use("/processes", ["PUBLIC"], processesApiRouter);
    this.use("/sessions", ["PUBLIC"], sessionsApiRouter);
    this.use("/users-actions", ["PUBLIC"], usersActionsApiRouter);
    this.use("/jobs", ["PUBLIC"], jobsApiRouter);
    this.use("/job-products", ["PUBLIC"], jobProductsApiRouter);
    this.use("/job-processes", ["PUBLIC"], jobProcessesApiRouter);
    this.use("/jobs-actions", ["PUBLIC"], jobsActionsApiRouter);
    this.use("/messages", ["PUBLIC"], messagesApiRouter);
    this.use("/xubio", ["PUBLIC"], xubioApiRouter)
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();