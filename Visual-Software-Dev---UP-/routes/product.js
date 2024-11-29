const express = require('express');
const router = express.Router();
const auth = require('../auth'); 


const db = require('../models'); 


const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');


const productService = new ProductService(db.Product);
const productController = new ProductController(productService);


router.post('/createproduct', async (req, res) => {
    productController.createProduct(req, res);
});


router.get('/getallproducts', async (req, res) => {
    productController.findAllProducts(req, res);
});


router.put('/updateproduct/:id', async (req, res) => {
    productController.updateProduct(req, res);
});


router.delete('/deleteproduct/:id', async (req, res) => {
    productController.deleteProduct(req, res);
});

module.exports = router;