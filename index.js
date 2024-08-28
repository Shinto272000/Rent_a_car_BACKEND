import express from "express"
import serverConfig from "./Src/Config/serverConfig.js"
import dbConnection from "./Src/Config/dbCongig.js"
import apiRouter from "./Src/Routes/index.js"
import cors from "cors"
import cookieParser from "cookie-parser"  
  

const app =express()

app.use(cors(
         {
    origin:["https://car-rental-front-end-mohanlal.vercel.app","http://localhost:5173"],  
    
     methods:['GET','POST','PUT','DELETE','OPTIONS'], 
     allowedHeaders:['Content-Type', 'Authorization'], 
     credentials : true, 
}
)
); 
app.use(express.json())
app.use(cookieParser())
app.get("/",(req,res)=>{  
    res.send("hello world")
}
);

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
