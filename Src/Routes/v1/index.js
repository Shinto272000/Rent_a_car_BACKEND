import express from "express"
import userRouter from "./userRoutes.js";
import carRouter from "./carRoutes.js";
import dealerRouter from "./dealerRoutes.js";
import paymentRoutes from "./payment.js";

const v1Router= express.Router()

v1Router.get("/",(req,res)=>{
    console.log("hello world")
    res.send("hi you are in v1 endpoint");
})

v1Router.use("/users",userRouter)
v1Router.use("/dealer",dealerRouter)
v1Router.use("/cars",carRouter)
v1Router.use("/payment",paymentRoutes)

export default v1Router 