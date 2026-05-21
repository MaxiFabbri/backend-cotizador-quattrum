import { messagesService } from "../services/index.service.js";
import { handlePrivateMessage } from "./handlers/privateMessageHandler.js";

const usersMap = new Map();
function getUsersObject(usersMap) {
  return Object.fromEntries(usersMap);
}

export function setupWebSocketServer(io) {
  console.log("New Websocket Server");

  io.on("connection", async (socket) => {
    const { userId, userName } = socket.handshake.auth;
    console.log("Cliente conectado:", socket.id, "-", userId, "-", userName);

    usersMap.set(userId, socket.id);
    io.emit("usersUpdate", getUsersObject(usersMap));

    // 🔹 Escuchar cuando un usuario abre un job
    socket.on("job:open", ({ jobId, userId }) => {

      const room = io.sockets.adapter.rooms.get(jobId);

      if (room) {
        // room es un Set con los socket.id de todos los que están en la room
        socket.emit("job:open:response", { jobId });

        // Avisar a los demás en esa room
        socket.to(jobId).emit("job:userJoined", { jobId });
      }

      socket.join(jobId); // se une a la "room" del job      
    });    

    // 🔹 Escuchar cuando un usuario cierra un job
    socket.on("job:close", ({ jobId, userId }) => {

      socket.leave(jobId);
      socket.to(jobId).emit("job:userLeft", { jobId, userId });
    });

    // 🔹 Mensajes broadcast
    socket.on("message", async (data) => {
      console.log("Mensaje recibido:", data);
      await messagesService.create({ emiterUserId: userId, message: data });
      socket.emit("response", `Eco: ${data}`);
      socket.broadcast.emit("newMessage", data);
    });

    // 🔹 Mensajes privados
    socket.on("privateMessage", ({ toUserId, message }) => {
      handlePrivateMessage(socket, { toUserId, message }, usersMap, io);
    });

    // 🔹 Desconexión
    socket.on("disconnect", () => {
      console.log("Cliente Desconectado: ", socket.id, " - ", userName);
      usersMap.forEach((value, key) => {
        if (value === socket.id) {
          usersMap.delete(key);
        }
      });
      io.emit("usersUpdate", getUsersObject(usersMap));
    });
  });
}
