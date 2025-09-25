// Import required modules
require("module-alias/register");
require('dotenv').config();
const express = require("express");
const path = require('path');
const { taskRoutes } = require("@routes");


// Create express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Create PORT
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// use taskRoutes for all /tasks calls
app.use("/tasks", taskRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


