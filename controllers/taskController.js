// Import TABLES and supabase client
import { TABLES } from "#config/config.js";
import { supabase } from "#db/supabase.js";

// Get all tasks
export async function getAllTasks(req, res) {
    const { data, status, error } = await supabase
        .from(`${TABLES.TASKS}`)
        .select()
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(400).json({ success: false, errorMessage: error.message });
    }

    // Successful retrieval
    return res.status(status).json({
        success: true,
        status: status,
        message: "Tasks retrieved successfully!",
        tasks: data,
    });
}

// Add task
export async function addTask(req, res) {
    const task = req.body.taskName;

    // Insert task into SupaBase tasks table
    const {data, error, status} = await supabase
        .from(`${TABLES.TASKS}`)
        .insert({ task_name: task })
        .select();

    if (error) {
        return res.status(400).json({ success: false, errorMessage: error.message });
    }

    // Successful insertion!
    return res.status(status).json({
        success: true,
        status: status,
        message: "Task added successfully!",
        task: data,
    });

}