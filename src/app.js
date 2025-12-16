import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnect from "./utils/dbConnect.util.js"
import addLogger from './utils/logger.js';
import envUtil from './utils/env.util.js';

import pathHandler from './middlewares/pathHandler.mid.js';
import errorHandler from './middlewares/errorHandler.mid.js';

import indexRouter from './routers/index.router.js';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  preflightContinue: false,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Rutas de archivos estáticos
app.use('/static', express.static('public')); // Sirve archivos estáticos desde el directorio "public"

// Middlewares
app.use(addLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(envUtil.SECRET_KEY));

// Rutas dinámicas
app.use(indexRouter);

// Middlewares para manejo de errores
app.use(errorHandler);
app.use(pathHandler);

// Conexión a la base de datos
dbConnect();

export default app;