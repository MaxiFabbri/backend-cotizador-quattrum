import { connect } from "mongoose";
import envUtil from "./env.util.js";

async function dbConnect() {
    try {
        connect(process.env.MONGO_LINK) 
    } catch (error) {
        console.log(error);        
    }
    console.log('Conexión a la base de datos establecida')
}

export default dbConnect