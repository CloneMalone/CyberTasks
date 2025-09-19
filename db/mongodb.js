require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_DB_URI;

// Create a MongoClient 
const mongoDBClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Connect to the server
async function runMongoDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoDBClient.connect();
    // Send a ping to confirm a successful connection
    await mongoDBClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}


module.exports = { runMongoDB };