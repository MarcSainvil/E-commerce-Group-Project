require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(url);

async function loadData(collectionName, fileName) {
    // Path to files
    const filePath = path.join('server', 'data', fileName);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        await client.connect();
        const insertResult = await collection.insertMany(data);
        console.log(`${insertResult.insertedCount} documents were inserted into collection ${collectionName}`);
    } catch (err) {
        console.error(`Failed to insert documents into ${collectionName}:`, err);
    }
}

// Loading data into collections
async function main() {
    try {
        // Load data into 'companies' collection from 'companies.json'
        await loadData('companies', 'companies.json');
        // Load data into 'items' collection from 'items.json'
        await loadData('items', 'items.json');
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
        console.log('Database connection closed.');
    }
}

main().catch(console.error);
