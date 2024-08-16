import express from "express"
import paymentControllers from "../../Controllers/paymentController.js"

const paymentRoutes = express.Router()

paymentRoutes.post("/order",paymentControllers.order)
paymentRoutes.post("/verify",paymentControllers.verify)

export default paymentRoutes