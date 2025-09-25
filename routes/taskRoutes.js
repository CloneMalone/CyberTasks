// Import router and controllers
const express = require("express");
const router = express.Router();
const { getAllTasks } = require("@controllers/taskController");

// Task Routes
router.get("/", getAllTasks);


module.exports = router;

