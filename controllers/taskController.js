// Import TABLES and supabase client
const { TABLES } = require("@config/config");
const { supabase } = require("@db/supabase");

// Get all tasks
async function getAllTasks(req, res) {
    console.dir("getAllTasks Controller Reached!");
}

// Add task
async function addTask(req, res) {
    // Grab the task from the body
    const task = {
        taskName: req.body.taskName
    }

    // Insert task into SupaBase tasks table
    const {data, error, status} = await supabase
        .from(`${TABLES.TASKS}`)
        .insert({ task_name: task.taskName })
        .select()

    // Catch any errors
    if (error) {
        return res.status(400).json({ success: false, errorMessage: error.message });
    }

    // Successful insertion!
    return res.status(status).json({
        success: true,
        status: status,
        message: "Task added successfully!",
        inserted: data,
    });

}

module.exports = { getAllTasks, addTask };