const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
    _id: {
        type: 'number',
        required: true
    },
    title: {
        type: 'string',
        required: true
    },
    desc: {
        type: 'string',
        required: true
    },
    price: {
        type: 'number',
        required: true
    },
    image: {
        type: 'string',
        required: true
    }
});

const userSchema = mongoose.Schema({
    email: {
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    favourite: [favouriteSchema]
});


module.exports = mongoose.model('users', userSchema)