import { messagesService } from "../services/index.service.js";
import { handlePrivateMessage } from "./handlers/privateMessageHandler.js";

const usersMap = new Map();
function getUsersObject(usersMap) {
  return Object.fromEntries(usersMap);
}

export function setupWebSocketServer(io) {
  console.log("New Websocket Server");
  // Manejar conexiones de clientes
  io.on("connection", async (socket) => {
    console.log(
      "Cliente conectado:",
      socket.id,
      " - ",
      socket.handshake.auth.userId,
      "- ",
      socket.handshake.auth.userName
    );
    const { userId } = socket.handshake.auth;
    const query = {
      receiverUserId: userId,
      status: "pending",
    };
    const pendingMessages = await messagesService.getPendingByUserId(query);
    if (pendingMessages.length > 0) {
      // console.log("Pending messages: ", pendingMessages);
      // socket.emit("pendingMessages", pendingMessages);
    }

    usersMap.set(userId, socket.id);
    io.emit("usersUpdate", getUsersObject(usersMap));

    // Mensajes a todos
    socket.on("message", async (data) => {
      console.log("Mensaje recibido:", data);
      await messagesService.create({ emiterUserId: userId, message: data });

      // Responder al cliente que lo envió
      socket.emit("response", `Eco: ${data}`);

      // Difundir a todos los demás clientes
      socket.broadcast.emit("newMessage", data);
    });

    // Mensajes a un usuario
    socket.on("privateMessage", ({ toUserId, message }) => {
      const payload = {
        toUserId,
        message,
      };
      handlePrivateMessage(socket, payload, usersMap, io)
    });

    // Manejar desconexión
    socket.on("disconnect", () => {
      usersMap.forEach((value, key) => {
        if (value === socket.id) {
          usersMap.delete(key);
        }
      });
      io.emit("usersUpdate", getUsersObject(usersMap));
    });
  });
}
