import { messagesService } from "../services/index.service.js";	

const usersMap = new Map();
function getUsersObject(usersMap) {
  return Object.fromEntries(usersMap);
}

export function setupWebSocketServer(io) {
  console.log("New Websocket Server")
  // Manejar conexiones de clientes
  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id, " - ", socket.handshake.auth.userId, "- ", socket.handshake.auth.userName);
    const { userId } = socket.handshake.auth;
    usersMap.set( userId, socket.id );
    io.emit('usersUpdate', getUsersObject(usersMap)); 

    // Mensajes a todos
    socket.on('message', async (data) => {
      console.log('Mensaje recibido:', data);
      await messagesService.create({ emiterUserId: userId, message: data });

      // Responder al cliente que lo envió
      socket.emit('response', `Eco: ${data}`);

      // Difundir a todos los demás clientes
      socket.broadcast.emit('newMessage', data);
    });

    // Mensajes a un usuario
    socket.on('privateMessage', ({ toUserId, message }) => {
      const targetSocketId = usersMap.get(toUserId);
      console.log(`Mensaje privado de ${userId} a ${toUserId}: ${message}`);
      if (toUserId) {
        io.to(toUserId).emit('privateMessage', {
          from: userId,
          message,
        });
      } else {
        socket.emit('errorMessage', `Usuario ${toUserId} no está conectado`);
      }
    });

    // Manejar desconexión
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
      usersMap.forEach((value, key) => {
        if (value.socketId === socket.id) {
          usersMap.delete(key);
        }
      });
      io.emit('usersUpdate', getUsersObject(usersMap));
    });
        
  });
}