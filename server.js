const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb+srv://dipanjan:dipu123@cluster0.uzy1y.mongodb.net/reservation')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Connection error", err));

// Schema and Model
const orderSchema = new mongoose.Schema({
    items: [{
        name: String,
        price: Number
    }],
    totalPrice: Number,
    orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// API Route to place order
app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).send({ message: "Order placed successfully!" });
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));