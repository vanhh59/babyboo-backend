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
  const getAllOrders = async (req, res) => {
    try {
      const orders = await orderService.getAllOrdersService();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const getUserOrders = async (req, res) => {
    try {
      const orders = await orderService.getUserOrdersService(req.user._id);
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const countTotalOrders = async (req, res) => {
    try {
      const totalOrders = await orderService.countTotalOrdersService();
      res.json({ totalOrders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const calculateTotalSales = async (req, res) => {
    try {
      const totalSales = await orderService.calculateTotalSalesService();
      res.json(totalSales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const calculateTotalSalesByDate = async (req, res) => {
    try {
      const salesByDate = await orderService.calculateTotalSalesByDateService();
      res.json(salesByDate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const findOrderById = async (req, res) => {
    try {
      const order = await orderService.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const markOrderAsPaid = async (req, res) => {
    try {
      const updatedOrder = await orderService.markOrderAsPaidService(req.params.id, req.body);
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const markOrderAsDelivered = async (req, res) => {
    try {
      const updatedOrder = await orderService.markOrderAsDeliveredService(req.params.id);
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
};

// module.exports = {
//   createOrder,
// };
const orderController = {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
};

export default orderController;