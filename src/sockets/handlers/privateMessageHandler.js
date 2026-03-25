import { messagesService } from "../../services/index.service.js";

/**
 * Maneja el envío de mensajes privados
 * @param {Object} socket - socket del emisor
 * @param {Object} payload - { toUserId, message }
 * @param {Map} usersMap - mapa de usuarios conectados
 * @param {Object} io - instancia de socket.io
 */
export async function handlePrivateMessage(
  socket,
  { toUserId, message },
  usersMap,
  io
) {
  const { userId } = socket.handshake.auth;
  try {
    // 1. Guardar en persistencia con estado "pending"
    const msg = await messagesService.create({
      emiterUserId: userId,
      receiverUserId: toUserId,
      message,
      status: "pending",
    });

    console.log(
      `Mensaje privado guardado: ${msg._id} de ${userId} a ${toUserId}`
    );

    // 2. Intentar entrega inmediata
    const targetSocketId = usersMap.get(toUserId);
    console.log("private message handler msg: ", msg)
    if (targetSocketId) {
      io.to(targetSocketId).emit("privateMessage", msg);
        const id = msg._id
        const data = {status: "delivered"}
      // 3. Actualizar estado a "delivered"
      await messagesService.update( id , data );
      console.log(`Mensaje ${msg._id} entregado a ${toUserId}`);
    } else {
      // 4. Si no está conectado, queda en pending
      socket.emit(
        "errorMessage",
        `Usuario ${toUserId} no está conectado. El mensaje queda pendiente.`
      );
      console.log(
        `Usuario ${toUserId} no conectado, mensaje ${msg._id} pendiente`
      );
    }
  } catch (err) {
    console.error("Error al manejar mensaje privado:", err);
    socket.emit("errorMessage", "No se pudo enviar el mensaje privado");
  }
}
