const User = require('../models/UserSchema');

const addCart = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(result => {
            // console.log(result);

            
            // Search for Product in cart by id and save on existProduct variable
            const existProduct = result.cart.find(c => c._id === req.body._id);

            if (existProduct) {
                return res.json({ message: 'O produto já existe no carrinho' });
            } else {
                result.cart.push(req.body);
                result.save((saveerr, saveresult) => {
                    if (!saveerr) {
                        res.json({ message: 'O produto foi adicionado ao seu carrinho', result: saveresult });
                    } else {
                        res.json({ message: saveerr });
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.json({ message: err });
        });
}


const removeCart = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(result => {
            const existProduct = result.cart.find(c => c._id === req.body._id);

            if (existProduct) {
                result.cart.remove(req.body);
                result.save((removeerr, removeresult) => {
                    if (!removeerr) {
                        res.json({ message: 'O produto foi removido do seu carrinho', result: removeresult });
                    } else {
                        res.json({ message: removeerr });
                    }
                })
            } else {
                res.json({ message: 'Este produto não existe no carrinho' });
            }
        });
}

module.exports = {
    addCart,
    removeCart
};