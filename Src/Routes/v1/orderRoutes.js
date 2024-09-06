import express from "express"
import orderdatas from "../../Controllers/orderControllers.js"
import ordercontroller from "../../Controllers/orderControllers.js"

const orderRouter = express.Router()

orderRouter.post("/details",ordercontroller.orderdatas) 
orderRouter.get("/testing",ordercontroller.testingg)
orderRouter.get('/orders/:userId',ordercontroller.userorder);
orderRouter.get('/allorders',ordercontroller.getallorder);
export default orderRouter