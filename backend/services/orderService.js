import orderRepository from "../repositories/orderRepository.js";

// Utility Function
function calcPrices(orderItems) {
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxRate = 0.15;
    const taxPrice = (itemsPrice * taxRate).toFixed(2);
  
    const totalPrice = (
      itemsPrice +
      shippingPrice +
      parseFloat(taxPrice)
    ).toFixed(2);
  
    return {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice,
      totalPrice,
    };
  }

const createOrder = async (orderData) => {
    const { orderItems, shippingAddress, paymentMethod } = orderData;
  
    const validatedOrderItems = await orderRepository.validateOrderItems(orderItems);
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(validatedOrderItems);
  
    const order = {
      orderItems: validatedOrderItems,
      user: req.user._id, // Assuming user data is available through middleware
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };
  
    const createdOrder = await orderRepository.createOrder(order);
    return createdOrder;
  };
  
//   module.exports = {
//     createOrder
//   };
  const orderService = {
    createOrder,
};

export default orderService;
  // module.exports = {
  //   orderService
  // };