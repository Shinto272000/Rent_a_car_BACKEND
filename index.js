import express from "express"
import serverConfig from "./Src/Config/serverConfig.js"
import dbConnection from "./Src/Config/dbCongig.js"
import apiRouter from "./Src/Routes/index.js"
import cors from "cors"
import cookieParser from "cookie-parser"  
  

const app =express()

app.use(cors(
         {
    origin:'*', 
    // credentials : true, 
     methods: 'GET,POST,PUT,DELETE,OPTIONS', 
}
)) 
app.use(express.json())
app.use(cookieParser())
app.get("/",(req,res)=>{  
    res.send("hello world")
})

app.use("/api",apiRouter)

app.listen(serverConfig.Port,(err)=>{
console.log(`port connected successfully on port ${serverConfig.Port}`);
dbConnection();
console.log("Db connected");    

})

// {
//     "rewrites": [
//         {"source": "/(.*)", "destination": "/"}
//     ]
// }
