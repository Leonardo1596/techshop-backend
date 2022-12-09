const router = require('express').Router();
const Cart = require('../controllers/Cart');
const verifyToken = require('../middlewares/verifyToken');


router.post('/add_cart', verifyToken, Cart.addCart);
router.post('/remove_cart', verifyToken, Cart.removeCart);

module.exports = router;