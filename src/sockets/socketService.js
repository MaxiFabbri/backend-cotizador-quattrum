import MessageModel from '../models/message.model.js';
import { messagesService } from '../services/index.service.js';

// Guardar un mensaje en la base de datos
export async function saveMessage(socketId, content) {
    console.log('Saving message:', { socketId, content });
    const message = new MessageModel({
        socketId,
        content,
    });
    return await messagesService.save();
}

// Recuperar mensajes pasados
export async function getMessages() {
    return await messagesService.readMessages.sort({ createdAt: 1 });
}