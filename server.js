// Import required modules
const { runMongoDB } = require('./db/mongodb.js');

require('dotenv').config();
const express = require("express");
const path = require('path');


// Create express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Create PORT
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the express server and MongoDB
const connectToExpressAndMongoDB = async () => {
    await runMongoDB();

    await app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
connectToExpressAndMongoDB();
