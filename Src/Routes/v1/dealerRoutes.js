import express from "express"
import dealercontroller from "../../Controllers/dealerControllers.js"
import authenticateDeals from "../../Middlewares/dealerMiddlewares.js"
import authenticateAdmin from "../../Middlewares/adminMiddlewares.js"
import carController from "../../Controllers/carControllers.js"
import { upload } from "../../Middlewares/uploadMiddlewares.js"

const dealerRouter=express.Router()

dealerRouter.post("/signup",dealercontroller.singup)
dealerRouter.post("/signin",dealercontroller.singin)
dealerRouter.delete("/:id",dealercontroller.removeDealers)
dealerRouter.get("/get-dealers",dealercontroller.getAllDealers)
// dealerRouter.get("/check-dealer", authenticateDeals, dealercontroller.checkAdmin ) 
dealerRouter.get("/check-dealer", authenticateAdmin, dealercontroller.checkAdmin ) 
dealerRouter.get("/cars",carController.getCar )
dealerRouter.delete("/cars/:id",carController.deleteCar)
dealerRouter.post("/addcars",upload.single("image"),carController.createCar)
dealerRouter.put("/cars/:id",carController.updateCar)
dealerRouter.get("/cars/:id",carController.getoneCar)
export default dealerRouter 