import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

const validateOrderItems = async (orderItems) => {
    const productIds = orderItems.map((item) => item._id);
  
    // Find products by IDs in a single query
    const products = await Product.find({ _id: { $in: productIds } });
  
    // Check if all requested products exist
    if (products.length !== orderItems.length) {
      throw new Error('Some requested products are not found');
    }
  
    // Validate each order item against the corresponding product
    const validatedOrderItems = orderItems.map((orderItem, index) => {
      const matchingProduct = products.find((product) => product._id.toString() === orderItem._id);
      if (!matchingProduct) {
        throw new Error(`Product not found: ${orderItem._id}`);
      }
  
      return {
        ...orderItem,
        product: matchingProduct._id, // Replace with product data if needed
        price: matchingProduct.price,
      };
    });
  
    return validatedOrderItems;
  };


const createOrder = async (order) => {
    const newOrder = new Order(order);
    const savedOrder = await newOrder.save();
    return savedOrder;
  };
  
//   module.exports = {
//     validateOrderItems,
//     createOrder,
//   };

  const orderRepository = {
    validateOrderItems,
    createOrder,
};

export default orderRepository;