import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";


async function  dbConnection(){

    try {
        await mongoose.connect(serverConfig.db)
    } catch (error) {
        console.log("mongo error detected",error);
    }
   
}

export default dbConnection