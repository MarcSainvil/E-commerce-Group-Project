'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');
  next();
});

// MongoDB connection
const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  console.error('Database URL is not defined in .env file');
  process.exit(1);
}

let db;

MongoClient.connect(dbUrl)
  .then(client => {
    console.log('Connected to Database');
    db = client.db('ecommerce');

    // Start the application after the database connection is ready
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Endpoints
app.get('/api/items', async (req, res) => {
  try {
    const items = await db.collection('items').find().toArray();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});
//handlers   const addToCart = async (productId, name, price, quantity) => {     try {       const response = await fetch('http://localhost:4000/api/cart/add', {         method: 'POST',         headers: {           'Content-Type': 'application/json',         },         body: JSON.stringify({ productId, name, price, quantity }),       });        if (!response.ok) {         throw new Error('Failed to add item to cart');       }        // Update cart state       dispatch({ type: 'ADD_ITEM', payload: { productId, name, price, quantity } });     } catch (error) {       console.error('Error adding item to cart:', error);     }   };       // JSX Template   return (     <ProductsContainer>       <h1 className='productTitle'>Our Products</h1>       <div className='productList'>         {products.length > 0 ? (           products.map(product => (             <ProductItem key={product._id} >               <div className="bgImage" style={{ backgroundImage: url(${product.imageSrc}) }}></div>
app.get('/api/cart', async (req, res) => {
  try {
    // Query the cart collection to retrieve all cart items
    const cartItems = await db.collection('cart').find().toArray();
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cart/add', async (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;
    const cartItem = {
      productId,
      name,
      price,
      quantity,
    };

    // Check if 'cart' collection exists, if not, create it
    const collectionExists = await db.listCollections({ name: 'cart' }).hasNext();
    if (!collectionExists) {
      await db.createCollection('cart');
      console.log('Created cart collection');
    }

    // Insert the cart item into the collection
    await db.collection('cart').insertOne(cartItem);

    // Query the collection to retrieve the inserted cart item
    const addedCartItem = await db.collection('cart').findOne(cartItem);

    res.status(201).json({ message: 'Item added to cart successfully', cartItem: addedCartItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});