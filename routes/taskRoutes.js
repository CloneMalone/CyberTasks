// Import router and controllers
import express from "express";
import { getAllTasks, addTask } from "#controllers/taskController.js";
const router = express.Router();

// Task Routes
router.get("/", getAllTasks);
router.post("/", addTask);

export default router;

