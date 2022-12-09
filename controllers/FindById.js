const Products = require('../products.json');

const findById = (req, res) => {
    const founded = Products.find(element => element._id == req.params.id);
    // console.log(founded);
    res.json({ founded: founded });
};


module.exports = { findById };