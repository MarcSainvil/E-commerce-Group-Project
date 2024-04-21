'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');
    next();
});

const dbUrl = process.env.DB_URL;
let db, client;

MongoClient.connect(dbUrl)
    .then(conn => {
        client = conn;
        db = client.db('ecommerce');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });

app.get('/api/items', async (req, res) => {
    try {
        const items = await db.collection('items').find().toArray();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await db.collection('cart').find().toArray();
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/cart/add', async (req, res) => {
    try {
        const { productId, name, price, quantity } = req.body;
        const itemId = parseInt(productId);
        const existingCartItem = await db.collection('cart').findOne({ productId: itemId });
        if (existingCartItem) {
            await db.collection('cart').updateOne({ productId: itemId }, { $inc: { quantity: quantity } });
        } else {
            const cartItem = {
                productId: itemId,
                name,
                price,
                quantity,
            };
            await db.collection('cart').insertOne(cartItem);
        }
        res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/checkout', async (req, res) => {
  const session = client.startSession();
  try {
      await session.startTransaction();
      const cartItems = await db.collection('cart').find().toArray();
      
      for (let item of cartItems) {
          const updateResult = await db.collection('items').updateOne(
              { _id: item.productId, numInStock: { $gte: item.quantity } },
              { $inc: { numInStock: -item.quantity } },
              { session }
          );

          if (updateResult.matchedCount === 0 || updateResult.modifiedCount === 0) {
              await session.abortTransaction();
              session.endSession();
              return res.status(400).json({ message: 'Insufficient stock for item ID: ' + item.productId });
          }
      }

      await db.collection('cart').deleteMany({}, { session });
      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: 'Checkout successful, cart cleared.' });
  } catch (error) {
      console.error('Checkout failed:', error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ error: 'Checkout transaction failed: ' + error.message });
  }
});