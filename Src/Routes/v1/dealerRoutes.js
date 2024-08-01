import express from "express"
import dealercontroller from "../../Controllers/dealerControllers.js"
import authenticateDls from "../../Middlewares/dealerMiddlewares.js"

const dealerRouter=express.Router()

dealerRouter.post("/signup",dealercontroller.singup)
dealerRouter.post("/signin",dealercontroller.singin)
dealerRouter.delete("/:id",dealercontroller.removeDealers)
dealerRouter.get("/get-dealers",dealercontroller.getAllDealers)
dealerRouter.get("/check-dealer", authenticateDls, dealercontroller.checkAdmin ) 



export default dealerRouter 