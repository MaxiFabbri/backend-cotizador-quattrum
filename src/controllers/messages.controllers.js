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

export { readMessages, readMessagesByUserId, readMessagesByMessageId, readMessagesByJobId, createMessage };