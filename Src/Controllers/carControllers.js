
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import Car from "../Models/carModels.js";

 const createCar = async (req, res) => {
    try {
      console.log("hitted");
      if(!req.file) {
      return res.send("file is not visible")
      }
      cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          console.log(err, "error");
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }

        console.log("result",result);
        
        const imageUrl = result.url;
  
        const { model,make, year, priceperDay, description } = req.body;
  
        // const findDealer = await Dealer.findOne({ email: dealerEmail });
  
        // if (!findDealer) {
        //   return res.send("please add dealer first");
        // }
  
        const createCar = new Car({
          model,
          make,
          year,
          priceperDay,
          description,
          // dealer: findDealer._id,
          image: imageUrl,
        });
        
        
        const newCarCreated = await createCar.save();
        if (!newCarCreated) {
          return res.send("car is not created");
        }
        return res.send(newCarCreated);
      });
    } catch (error) {
      console.log("something went wrong", error);
      res.send("failed to create car");
    }
  };

  const getCar = async(req,res)=>{

    try {
        const cars = await Car.find()
        return res.send(cars)
    } catch (error) {
        console.log("something went wrong", error);
      res.send("failed to fetch car");
        
    }
  }

  const getoneCar = async(req,res)=>{

    try {
        const cars = await Car.find({_id:id})
        return res.send(cars)
    } catch (error) {
        console.log("something went wrong", error);
      res.send("failed to fetch car");
        
    }
  }
  const updateCar =async (req,res)=>{

    try {
      const {id} = req.params
      const {model,make, year, priceperDay, description} = req.body
      const updateCar = await Car.findByIdAndUpdate(
        id,
        {
          model,
          make,
          year,
          priceperDay,
          description
        },
        { new: true}
      );
      return res.send(updateCar)
    } catch (error) {
      console.log("something went wrong", error);
      res.send("failed to fetch car");
    }
  }

  const deleteCar= async(req,res) =>{
    try {
      const {id} = req.params
      console.log(typeof id);
      const deleteCar = await Car.deleteOne({_id:id});
      if(!deleteCar){
        return res.send("failed to delete ")
      }
      return res.send("deleted")
      
      
    } catch (error) {
      console.log("something went wrong", error);
      res.send("failed to delete car");
    }
  }
    const carController = {createCar,getCar,updateCar,deleteCar,getoneCar}
  export default  carController 