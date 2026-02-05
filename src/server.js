import { Server } from 'socket.io';
import app from './app.js';
import { setupWebSocketServer } from './sockets/socketHandler.js';

const PORT = process.env.PORT || 8000;

// Iniciar el servidor
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

// Configurar el servidor WebSocket
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL, // Cambia esto según tu configuración
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    },
});

// Configurar los manejadores de eventos de WebSocket
setupWebSocketServer(io);


