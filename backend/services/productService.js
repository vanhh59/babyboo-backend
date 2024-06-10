const productRepository = require('../repositories/productRepository');
const bodyParser = require('body-parser');

class productService {
 
    
     async getAllService() {
        const products = await productRepository.getAll();
        return products;
    }
    
      async addproduct(productData) {
        const newproduct = await productRepository.addProduct(productData);
        return newproduct;
    }
}
module.exports = new productService;