const router = require('express').Router();
const products = require('../products.json');

router.get('/products', (req, res) => {
    res.json({ products });
});

module.exports = router;