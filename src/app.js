import express from 'express';
import cookieParser from 'cookie-parser';
import dbConnect from "./utils/dbConnect.util.js"
import addLogger from "./utils/logger.js";
import envUtil from "./utils/env.util.js"
import cors from "cors";

import pathHandler from "./middlewares/pathHandler.mid.js"
import errorHandler from "./middlewares/errorHandler.mid.js"

import indexRouter from "./routers/index.router.js"


const app = express();
const PORT = process.env.PORT||8080;

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://quattrum-cotizador.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
      return res.sendStatus(200); // Responde correctamente a preflight requests
  }
  
  next();
});

// Configuración de CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'https://quattrum-cotizador.vercel.app'],
  credentials: true
};
app.use(cors(corsOptions));



const ready = () => {
    console.log("Server ready on port: ",PORT);
    dbConnect()
    console.log("mongodb connected");
}

app.listen(PORT, ready)


// paquete de rutas-endpoints estatico;
app.use('/static', express.static('public'))

// middlewares
app.use(addLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(morgan("dev"))
app.use(cookieParser(envUtil.SECRET_KEY))

// Routes
app.use(indexRouter)

// Middlewares
app.use(errorHandler)
app.use(pathHandler)