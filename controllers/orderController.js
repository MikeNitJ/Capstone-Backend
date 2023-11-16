const express = require("express")
const router = express.Router()
const Order = require("../models/Order")
const Food = require("../models/Food")

// ทำไม มองไม่เห็น foods แต่เห็น req.body.foods 32min 8/12
router.post("/", async (req, res) =>{
    try {
        let foods = await Food.find({_id: { $in: req.body.foods }})
        // console.log(foods);
        let total = 0
        req.body.foods.map(
            (food) => 
            (total+= foods.find((f) => {
                // for check loop how it works
                // console.log(f._id.toString(), food);
                // console.log(f._id.toString() == food);

                return f._id.toString() == food;
            }).price)
            )
        req.body.total = total

        res.json( await Order.create(req.body))
        
    }catch (error){
        res.status(400).json(error)
    }
})
// SHOW Route for Cart page or Order receiving page
router.get("/:id", async (req, res) => {
    try{
        // res.json(await Order.findById(req.params.id)
        // .populate("foods")
        // .populate("userId"))
        const order = await Order.findById(req.params.id)
      .populate("foods")
      .populate("userId");

    res.json(order);
    }catch(error){
        res.status(400).json(error)
    }
})

// Create New Order with empty food Id still need to get userId that verify from login to create order
router.post("/createcart", async (req, res) => {
    try {
        const { userId } = req.body; // The request body should contain userId and foods
        const orderData = {
          userId: userId,
          // other order properties if needed
      };
        const order = await Order.create(orderData);
        res.json(order);
    }catch(error){
        res.status(400).json(error)
    }
})

// router.put('/updatecart/:id', async (req, res) => {
//     try {
//       const { id } = req.params; // Extract the orderId from the URL
//       const { foods } = req.body; // Extract the updated foods from the request body
  
//       // Assuming you have an Order model defined
//       const order = await Order.findByIdAndUpdate(
//         id,
//         { foods },
//         { new: true }
//       );
  
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
  
//       // Respond with the updated order or other data as needed
//       res.json(order);
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   });


// this route is link with addcart function and work fine
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { foods } = req.body; // Extract the selected food ID from the request body
      //   const order = await Order.findByIdAndUpdate(req.params.id,{ foods }
          
      //     )
          const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { $push: { foods: foods } }, // Use $push to add the new food to the existing array
            { new: true } // This option ensures that you get the updated document as the result
          );
      // Update the Order with the selected food (foodId)
      // You need to implement the logic to update the Order as needed
      // Ensure that you have the Order model and the necessary database operations in place.
  
      // Respond with the updated Order or other data as needed
      res.json({ message: 'Food added to the cart',order: updatedOrder });
    } catch (error) {
      res.status(400).json(error);
    }
  });

// DELETE Route to remove a food item from the order
router.delete('/:orderId/food/:foodId', async (req, res) => {
    try {
      const { orderId, foodId } = req.params;
  
      // Use $pull to remove the specified foodId from the foods array
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $pull: { foods: foodId } },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.json({ message: 'Food removed from the cart', order: updatedOrder });
    } catch (error) {
      res.status(400).json(error);
    }
  });
  
  module.exports = router;
  




module.exports = router