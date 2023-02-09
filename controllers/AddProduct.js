const products = require('../products');

const addProduct = (req, res) => {
    let product = {
        id: products.length + 1,
        title: req.body.title,
        desc: req.body.description,
        make: req.body.make,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image
    }

    products.push({ product });
    res.json({ messge: 'Produto cadastrado com sucesso!', products: products });
}


module.exports = { addProduct };