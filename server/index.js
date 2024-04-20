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