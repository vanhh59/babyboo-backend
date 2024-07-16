import orderService from "../services/orderService.js";


const createOrder = async (req, res) => {
  try {
    const orderData = {
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
    };

    const createdOrder = await orderService.createOrder(orderData);
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// module.exports = {
//   createOrder,
// };
const orderController = {
  createOrder,
};

export default orderController;