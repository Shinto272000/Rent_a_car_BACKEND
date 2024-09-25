import Review from "../Models/reviewModel.js";

const reviewdatas = async (req, res) => {
    try {
        // Validate request body
        const { userId,fullName, review, rating} = req.body;
        if (!fullName || !review || !rating) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create and save the new order
        const newReviews = new Review({
            userId,fullName, review, rating,
        });

        await newReviews.save();
        
        // Log the successful creation of the order
        console.log('Review saved successfully:', newReviews);
        
        // Send response
        res.status(201).json({
            message: 'Review created successfully',
            revws: newReviews
        });
    } catch (error) {
        // Log the error
        console.error('Error saving review:', error);

        // Send error response
        res.status(500).json({ error: 'Failed to save review' });
    }
};

const getallreview = async(req,res)=>{

    const allreview= await Review.find()

    res.send(allreview)
}

const singleReview = async(req,res)=>{
    const {id} = req.params

    try {  
        const userReview = await Review.findOne({userId:id})
        if (!userReview) {
            return res.status(404).send("No review found for this user.");
          }
        return res.send(userReview)
        
    } catch (error) {
        console.log("something went wrong", error);
      res.send("failed to fetch review");
        
    }
  }

const reviewController = {reviewdatas,getallreview,singleReview}

export default reviewController