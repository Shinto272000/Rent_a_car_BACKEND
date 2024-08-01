import express from "express"
import serverConfig from "./Config/serverConfig.js"
import dbConnection from "./Config/dbCongig.js"
import apiRouter from "./Routes/index.js"
import cors from "cors"

const app =express()


app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello world")
})



app.use("/api",apiRouter)

app.listen(serverConfig.Port,(err)=>{
console.log(`port connected successfully on port ${serverConfig.Port}`);
dbConnection();
console.log("Db connected");

})