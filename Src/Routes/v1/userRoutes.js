import express from "express"
import userController from "../../Controllers/userControllers.js";
import carController from "../../Controllers/carControllers.js";
const userRouter = express.Router()

userRouter.get("/",(req,res)=>{
    res.send("Hello shinto");
})

userRouter.post("/signup",userController.signup)
userRouter.post("/signin",userController.signin)
userRouter.get("/all-cars",carController.getCar)
userRouter.get("/all-cars/:id",carController.getoneCar)
userRouter.get("/check-user",userController.checkUser)


export default userRouter 