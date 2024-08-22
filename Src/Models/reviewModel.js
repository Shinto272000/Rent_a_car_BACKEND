import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    fullName: {
        type: String,
        required: true,
        maxLength: 50,
      },
    
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    
    review: {
      type: String,
      required: true,
    }, 
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;