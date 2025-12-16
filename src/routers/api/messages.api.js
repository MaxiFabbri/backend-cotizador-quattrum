import CustomRouter from "../../utils/CustomRouter.util.js";
import { createMessage, readMessages, readMessagesByUserId, readMessagesByJobId, readMessagesByMessageId } from "../../controllers/messages.controllers.js";	

class MessagesApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createMessage);
        this.read("/", ["PUBLIC", "ADMIN"], readMessages);
        this.read("/user/:id", ["PUBLIC", "ADMIN"], readMessagesByUserId);
        this.read("/job/:id", ["PUBLIC", "ADMIN"], readMessagesByJobId);
        this.read("/message/:id", ["PUBLIC", "ADMIN"], readMessagesByMessageId);
    
    };
}

const messagesApiRouter = new MessagesApiRouter();
export default messagesApiRouter.getRouter();