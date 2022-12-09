const router = require('express').Router();
const FindById = require('../controllers/FindById');

router.get('/products/:id', FindById.findById);


module.exports = router;