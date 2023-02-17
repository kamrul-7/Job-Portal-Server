const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


const app = express();

//middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zwakwnm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const FresherJobsCollection = client.db('JobsPortal').collection('FresherJobs');
        const ExperiencedJobsCollection = client.db('JobsPortal').collection('ExperiencedJobs');

        app.get('/FresherJobs', async (req, res) => {
            const query = {};
            const options = await FresherJobsCollection.find(query).toArray();
            res.send(options);
        })
        app.get('/ExperiencedJobs', async (req, res) => {
            const query = {};
            const options = await ExperiencedJobsCollection.find(query).toArray();
            res.send(options);
        })
    }
    finally {

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('Job portal server is running')
})
app.listen(port, () => console.log(`Job portal running on ${port}`))