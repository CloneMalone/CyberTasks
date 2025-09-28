// Import required modules
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import taskRoutes from "#routes/taskRoutes.js";

// Create PORT
const PORT = process.env.PORT || 3000;

// Create express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, "public")));

// use taskRoutes for all /tasks calls
app.use("/tasks", taskRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


