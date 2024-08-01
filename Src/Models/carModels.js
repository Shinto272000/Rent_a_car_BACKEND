import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    make: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    year: {
      type: Number,
      required: true,
    },
    priceperDay: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
    },
    
    image: {
      type: String,
    },
    
    dealer: [{ type: mongoose.Types.ObjectId, ref: "Dealer" }],
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;