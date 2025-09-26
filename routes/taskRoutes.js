// Import router and controllers
const express = require("express");
const router = express.Router();
const { getAllTasks, addTask } = require("@controllers/taskController");

// Task Routes
router.get("/", getAllTasks);
router.post("/", addTask);


module.exports = router;

