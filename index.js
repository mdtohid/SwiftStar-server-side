const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h2etdni.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");



        // // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });

        const CarCollection = client.db("SwiftStar").collection("CarCollection");
        const AddCartCollection = client.db("SwiftStar").collection("AddCart");

        app.get('/cars', async (req, res) => {
            const query = {};
            const cursor = CarCollection.find(query);
            const result = await cursor.toArray();
            // console.log(result);
            res.send(result);
        })

        app.get('/addCart', async (req, res) => {
            const query = {};
            const cursor = AddCartCollection.find(query);
            const result = await cursor.toArray();
            // console.log(result);
            res.send(result);
        })

        app.post('/addCart', async (req, res) => {
            console.log(req.body);
            const doc = req.body;
            const result = await AddCartCollection.insertOne(doc);
            res.send(result);
        })
    }

    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello Worldsssss')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})