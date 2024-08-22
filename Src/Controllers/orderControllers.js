// import Orderr from "../Models/orderModel.js";

// const orderdatas = async (req, res) => {

//     try {
//         const orderData = req.body;
//         const newOrder = new Orderr(orderData); 
//         await newOrder.save(); 
//         console.log(orderData);
        
//         res.status(201).json(newOrder); 
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to save order' }); 
//     }



// }
// export default orderdatas


import Orderr from "../Models/orderModel.js";

const orderdatas = async (req, res) => {
    try {
        // Validate request body
        const { car, days, totalAmount, startDate, endDate, pickupLocation, userId } = req.body;
        if (!car || !days || !totalAmount || !startDate || !endDate || !pickupLocation) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create and save the new order
        const newOrder = new Orderr({
            car,
            days,
            totalAmount,
            startDate,
            endDate,
            pickupLocation,
            userId
        });

        await newOrder.save();
        
        // Log the successful creation of the order
        console.log('Order saved successfully:', newOrder);
        
        // Send response
        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder
        });
    } catch (error) {
        // Log the error
        console.error('Error saving order:', error);

        // Send error response
        res.status(500).json({ error: 'Failed to save order' });
    }
};

const testingg = (req,res)=>{
    res.send("tou are in details testing page")
}

const getallorder =async (req,res)=>{
    const orders = await Orderrs.find()
    res.send(orders)
}

const userorder= async (req,res)=>{
try {
    const {userId} = req.params;

    if(!userId){
        return res.status(400).json({error:"userid is required"})
    }
    const orders = await Orderr.find({userId})

    res.status(200).json(orders)
} catch (error) {
    console.error(error);
    res.status(500).json({error : " Error occured while fetching"})
    
}
}

const ordercontroller = {testingg,orderdatas,userorder,getallorder}

export default ordercontroller;
