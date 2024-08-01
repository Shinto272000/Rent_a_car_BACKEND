import express from "express"
import userRouter from "./userRoutes.js";
import carRouter from "./carRoutes.js";
import dealerRouter from "./dealerRoutes.js";

const v1Router= express.Router()

v1Router.get("/",(req,res)=>{
    console.log("hello world");
})

v1Router.use("/users",userRouter)
v1Router.use("/dealer",dealerRouter)
v1Router.use("/cars",carRouter)

export default v1Router