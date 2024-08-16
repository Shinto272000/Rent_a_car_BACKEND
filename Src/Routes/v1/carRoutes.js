import express from "express"
import { upload } from "../../Middlewares/uploadMiddlewares.js"
// import authenticateDls from "../../Middlewares/dealerMiddlewares.js"
import carController from "../../Controllers/carControllers.js"
import authenticateDeals from "../../Middlewares/dealerMiddlewares.js"

const carRouter=express.Router()

carRouter.post("/add-cars", upload.single("image"),carController.createCar)

carRouter.get("/",
    //  authenticateDeals,
      carController.getCar)

carRouter.put("/:id",carController.updateCar)

carRouter.delete("/:id",carController.deleteCar)


export default carRouter