import express from "express"
// import userController from "../../Controllers/userControllers.js";
// import carController from "../../Controllers/carControllers.js";
import reviewController from "../../Controllers/reviewController.js";
const reviewRouter = express.Router()

reviewRouter.get("/",(req,res)=>{
    res.send("Hello reviewer");
})


reviewRouter.post("/reviewdatas",reviewController.reviewdatas)
reviewRouter.get("/getreview",reviewController.getallreview)

export default reviewRouter 