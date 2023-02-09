const router = require('express').Router();
const AddProduct = require('../controllers/AddProduct');


router.post('/add-product', AddProduct.addProduct);


module.exports = router;