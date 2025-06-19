import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import passport from "../../middlewares/passport.mid.js";
import createPassword from "../../middlewares/createPassword.mid.js"
import { register, login, signout, online, updatePassword, resetPassword } from "../../controllers/sessions.controllers.js";

class SessionsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.create("/signout", ["USER", "ADMIN"], passportCb("signout"), signout);
    this.create("/online", ["PUBLIC"], passportCb("online"), online);
    this.create("/update-password", ["USER", "ADMIN"], passportCb("updatePassword"), updatePassword, login);
    this.create("/reset", ["PUBLIC"], createPassword, passportCb("resetPassword"), resetPassword)
  };
}

const sessionsRouter = new SessionsApiRouter();
export default sessionsRouter.getRouter();