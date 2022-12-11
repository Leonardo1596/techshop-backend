const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const register = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hashedpass) => {
        if (err) {
            res.json({ error: err });
        }


        let user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedpass,
            confirmPassword: req.body.confirmPassword,
            favourite: []
        });


        // Check if email already exists
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    saveUser();
                } else {
                    console.log('email already exists');
                    res.json({ message: 'Email already exists' });
                }
            });


        function saveUser() {
            user.save()
                .then(user => {
                    // Create token
                    const accessToken = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY, {
                        expiresIn: '60s'
                    });

                    console.log('Successfully registered');
                    console.log(`User: ${user.user}`);
                    console.log(user);
                    res.status(201).json({ token: accessToken, userProfile: user, message: 'Successfully registered' });
                })
                .catch(error => {
                    console.log(error);
                    res.json({ message: 'An error ocurred' });
                });
        }
    });
}


const login = (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.json({ error: err });
                    }
                    if (result) {
                        // Create token
                        const accessToken = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY, {
                            expiresIn: '300s'
                        });

                        // Successfully
                        console.log(`User: ${user.email} is signed`)

                        res.json({ token: accessToken, userProfile: user, message: 'Successfully signed' });
                        next();
                    } else {
                        res.json({ message: 'Password is wrong!' });
                    }
                });
            } else {
                console.log('user not found');
                res.json({ message: 'User not found' });
            }
        });
};


module.exports = {
    register, login
}