import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  createMessage,
  readMessages,
  readMessagesByUserId,
  readMessagesByJobId,
  readMessagesByMessageId,
  updateMessageById,
  readMessagesPendingByUserId,
} from "../../controllers/messages.controllers.js";	

class MessagesApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createMessage);
        this.read("/:id", ["USER", "ADMIN"], readMessagesByMessageId);
        this.read("/", ["USER", "ADMIN"], readMessages);
        this.read("/user/:id", ["USER", "ADMIN"], readMessagesByUserId);
        this.read("/job/:id", ["USER", "ADMIN"], readMessagesByJobId);
        this.read("/pending/:userId", ["USER", "ADMIN"], readMessagesPendingByUserId);
        this.update("/:id", ["USER", "ADMIN"], updateMessageById)
    
    };
}

const messagesApiRouter = new MessagesApiRouter();
export default messagesApiRouter.getRouter();