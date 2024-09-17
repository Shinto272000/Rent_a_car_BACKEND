
import { cloudinaryInstance } from "../Config/cloudinaryConfig.js";
import Car from "../Models/carModels.js";
import Dealer from "../Models/dealerModel.js";

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
  
        const { model,make, year, priceperDay, description,dealerEmail } = req.body;
  
        const findDealer = await  Dealer.findOne({ email: dealerEmail });
  
        if (!findDealer) {
          return res.send("please add dealer first");
        }
  
        const createCar = new Car({
          model,
          make,
          year,
          priceperDay,
          description,
          dealer: findDealer._id,
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
    const {id} = req.params

    try {
        const singlecar = await Car.findOne({_id:id})
        return res.send(singlecar)
        
    } catch (error) {
        console.log("something went wrong", error);
      res.send("failed to fetch car");
        
    }
  }
  // const updateCar =async (req,res)=>{

  //   try {
  //     const {id} = req.params
  //     console.log("hitted");
  //     if(!req.file) {
  //     return res.send("file is not visible")
  //     }
  //     cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
  //       if (err) {
  //         console.log(err, "error");
  //         return res.status(500).json({
  //           success: false,
  //           message: "Error",
  //         });
  //       }

  //       console.log("result",result);
        
  //       const imageUrl = result.url;
      
  //     const {model,make, year, priceperDay, description} = req.body
  //     const updateCar = await Car.findByIdAndUpdate(
  //       id,
  //       {
  //         model,
  //         make,
  //         year,
  //         priceperDay,
  //         description,
  //         image: imageUrl,
  //       },
  //       { new: true}
  //     );
  //     return res.send(updateCar)
  //   })
  //   } catch (error) {
  //     console.log("something went wrong", error);
  //     res.send("failed to fetch car");
  //   }
  // }

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    // Initialize the image URL variable
    let imageUrl = null;

    // Check if a file is uploaded
    if (req.file) {
      // Upload the file to Cloudinary and get the image URL
      try {
        const result = await cloudinaryInstance.uploader.upload(req.file.path);
        imageUrl = result.url;
      } catch (err) {
        console.log("Cloudinary upload error:", err);
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
        });
      }
    }

    // Extract car details from request body
    const { model, make, year, priceperDay, description } = req.body;

    // Find and update the car in the database
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      {
        model,
        make,
        year,
        priceperDay,
        description,
        ...(imageUrl && { image: imageUrl }) // Update image only if a new one is provided
      },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).send("Car not found");
    }

    // Send the updated car details as response
    return res.send(updatedCar);
  } catch (error) {
    console.log("Error updating car:", error);
    res.status(500).send("Failed to update car");
  }
};



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

  const dealersCar = async(req,res)=>{
    const {dis} = req.params

    try {
        const dealersscar = await Car.findOne({dealer:dis})
        return res.send(dealersscar)
        
    } catch (error) {
        console.log("something went wrong", error);
      res.send("failed to fetch car");
        
    }
  }
    const carController = {createCar,getCar,updateCar,deleteCar,getoneCar,dealersCar}
  export default  carController 