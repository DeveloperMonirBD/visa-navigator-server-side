const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hhc73.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        const db = client.db('visaNavigator');
        const visasCollection = db.collection('visas');

        // Add Visa
        app.post('/api/visas/add', async (req, res) => {
            try {
                const newVisa = req.body;
                await visasCollection.insertOne(newVisa);
                res.status(201).json(newVisa);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        });

        // GET Method to fetch all visas
        app.get('/api/visas', async (req, res) => {
            try {
                const visas = await visasCollection.find({}).toArray();
                res.status(200).json(visas);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });

        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING');
});

app.listen(port, () => {
    console.log(`Simple Crud is running on port: ${port}`);
});
