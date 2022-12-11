require('dotenv').config();
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const port  = process.env.PORT || 8000;


// Import controllers


// Import routes
const routeAuth = require('./routes/auth');
const routeCart = require('./routes/cart');
const routeProducts = require('./routes/products');
const routeFindById = require('./routes/findById');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());


// Routes
app.use(routeAuth);
app.use(routeCart);
app.use(routeProducts);
app.use(routeFindById);


// Route Homepage
app.get("/", function (req, res) {
  res.send(`api running`);
});


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.emit('ready');
        console.log('Connected to MongoDB');
    })
    .catch((error) => console.log(error));


// Server
app.on('ready', () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log(`http://localhost:${port}`);
    });
})