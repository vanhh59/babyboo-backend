const mongoose = require('mongoose');
const Product = require('../models/productModel');
const bodyParser = require('body-parser');

class productRepository {
  async getAll() {
    const products = await Product.find({});
    console.log(products);
    return products;
  }

  async addProduct(prData) {
    const newProduct = new Product(prData);
    await newProduct.save();
    return newProduct;
  }
}
module.exports = new productRepository;