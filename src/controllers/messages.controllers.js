import { messagesService } from "../services/index.service.js";

async function createMessage(req, res) {
    const message = "MESSAGE CREATED";
    const { body } = req;
    const response = await messagesService.create(body);
    return res.status(201).json({ response, message });
}

async function readMessages(req, res) {
    const message = "MESSAGES FOUND";
    const response = await messagesService.getAll();
    return res.status(200).json({ response, message }).sort({ createdAt: 1 });
}

async function readMessagesByUserId(req, res) {
    const { id } = req.params;
    const message = "MESSAGES FOUND";
    const response = await messagesService.get({"userId":id});
    return res.status(200).json({ response, message });
}

async function readMessagesByMessageId(req, res) {
    const { id } = req.params;
    const message = "MESSAGES FOUND";
    const response = await messagesService.get({"_id":id});
    return res.status(200).json({ response, message });
}
async function readMessagesByJobId(req, res) {
    const { id } = req.params;
    const message = "MESSAGES FOUND";
    const response = await messagesService.get({"jobId":id});
    return res.status(200).json({ response, message });
}
async function readMessagesPendingByUserId(req, res) {
    const { userId } = req.params;
    const message = "MESSAGES FOUND";
    const response = await messagesService.getPendingByUserId({
      receiverUserId: userId,
      status: "pending"
    });
    return res.status(200).json({ response, message });
}
async function updateMessageById(req,res) {
    const data = req.body
    const { id } = req.params;
    console.log("messages controller id: ", id, " Data: ", data)
    const message = "MESSAGES UPDATED";
    const response = await messagesService.update( id, data );
    return res.status(200).json({ response, message });
}

export {
  readMessages,
  readMessagesPendingByUserId,
  readMessagesByUserId,
  readMessagesByMessageId,
  readMessagesByJobId,
  createMessage,
  updateMessageById,
};