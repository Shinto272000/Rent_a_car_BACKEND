import mongoose from "mongoose"

const orderrSchema = new mongoose.Schema(
{
    car: {
        model: String,
        make: String,
        year: Number,
        description: String,
        image: String,
        priceperDay: Number,
        dealer: [{ type: String }],
      },
      days: Number,
      totalAmount: Number,
      startDate: Date,
      endDate: Date,
      pickupLocation: String,
      userId : String

})

const Orderr = mongoose.model("Orderr",orderrSchema)
export default Orderr