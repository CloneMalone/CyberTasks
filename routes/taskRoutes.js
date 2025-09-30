// Import router and controllers
import express from "express";
import { getAllTasks, addTask, deleteTask } from "#controllers/taskController.js";
const router = express.Router();

// Task Routes
router.get("/", getAllTasks);
router.post("/", addTask);
router.delete("/:id", deleteTask);

export default router;

