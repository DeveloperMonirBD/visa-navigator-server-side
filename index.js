const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // ObjectID -> ObjectId
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
        // await client.connect();

        const db = client.db('visaNavigator');
        const visasCollection = db.collection('visas');
        const applicationsCollection = db.collection('applications');

        // All Visas Method:
        // POST Method to store Visas data
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

        // GET Method to fetch latest 6 visas
        app.get('/api/latestVisas', async (req, res) => {
            try {
                const latestVisas = await visasCollection.find({}).sort({ _id: -1 }).limit(6).toArray();
                res.status(200).json(latestVisas);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });

        // GET Method to fetch a single visa by ID
        app.get('/api/visas/:id', async (req, res) => {
            try {
                const id = req.params.id;
                console.log('Fetching Visa with ID:', id);
                const visa = await visasCollection.findOne({ _id: new ObjectId(id) });
                if (!visa) {
                    return res.status(404).json({ message: 'Visa not found' });
                }
                res.status(200).json(visa);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });

        // GET Method to fetch visas by user email
        app.get('/myAddedVisas', async (req, res) => {
            try {
                const email = req.headers.authorization?.split(' ')[1];
                if (!email) {
                    return res.status(400).send({ message: 'Email not provided' });
                }
                const result = await visasCollection.find({ email }).toArray();
                if (!result || result.length === 0) {
                    return res.status(404).send({ message: "Your Visa data is 'Empty'" });
                }
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: 'Server error', error });
            }
        });

        // Put Method to Update application by ID
        app.get('/visas/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const visa = await visasCollection.findOne(query);
            res.send(visa);
        });
        // Put Method to Update application by ID
        app.put('/visas/:id', async (req, res) => {
            const id = req.params.id;
            const visa = req.body;
            console.log(id, visa);
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedvisa = {
                $set: {
                    countryImage: visa.countryImage,
                    countryName: visa.countryName,
                    visaType: visa.visaType,
                    processingTime: visa.processingTime,
                    requiredDocuments: visa.requiredDocuments,
                    description: visa.description,
                    ageRestriction: visa.ageRestriction,
                    fee: visa.fee,
                    validity: visa.validity,
                    applicationMethod: visa.applicationMethod
                }
            };

            const result = await visasCollection.updateOne(filter, updatedvisa, options);
            res.send(result);
        });

        // DELETE Method to remove visa by ID
        app.delete('/api/visas/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const result = await visasCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'Visa deleted successfully.' });
                } else {
                    res.status(404).json({ message: 'Visa not found.' });
                }
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });

        // All Applications Method:
        // POST Method to store application data
        app.post('/api/applications/add', async (req, res) => {
            try {
                const newApplication = req.body;
                await applicationsCollection.insertOne(newApplication);
                res.status(201).json(newApplication);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        });

        // Add this GET method to fetch applications by email
        app.get('/api/applications', async (req, res) => {
            try {
                const email = req.query.email;
                const applications = await applicationsCollection.find({ email }).toArray();
                res.status(200).json(applications);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });

        // DELETE Method to remove application by ID
        app.delete('/api/applications/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const result = await applicationsCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'Application cancelled successfully.' });
                } else {
                    res.status(404).json({ message: 'Application not found.' });
                }
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });

        // ** Send a ping to confirm a successful connection

        // await client.db('admin').command({ ping: 1 });
        // console.log('Pinged your deployment. You successfully connected to MongoDB!');
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
