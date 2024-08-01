import express from "express"
import userController from "../../Controllers/userControllers.js";
const userRouter = express.Router()

userRouter.get("/",(req,res)=>{
    res.send("Hello shinto");
})

userRouter.post("/signup",userController.signup)
userRouter.post("/signin",userController.signin)


export default userRouter 