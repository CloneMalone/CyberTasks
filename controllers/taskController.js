// Import
import { TABLES } from "#config/config.js";
import { supabase } from "#db/supabase.js";
import { Task } from "#models/Task.js";


// Get all tasks
export async function getAllTasks(req, res) {
    const { data, status, error } = await supabase
        .from(`${TABLES.TASKS}`)
        .select()
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(400).json({ success: false, errorMessage: error.message });
    }

    // Map each row to a task object
    const tasks = data.map(row => {
        const task = new Task(row);
        return {
            id: task.id,
            task_name: task.task_name,
            created_at: task.created_at,
            priority: task.priority,
            formattedDate: task.formattedDate
        }
    });

    // Successful retrieval
    return res.status(status).json({
        success: true,
        status: status,
        message: "Tasks retrieved successfully!",
        tasks: tasks,
    });
}

// Add task
export async function addTask(req, res) {
    const task = req.body;

    // Insert task into SupaBase tasks table
    const {data, error, status} = await supabase
        .from(`${TABLES.TASKS}`)
        .insert({ task_name: task.taskName, priority: task.taskPriority })
        .select();

    if (error) {
        return res.status(400).json({ success: false, errorMessage: error.message });
    }

    // Grab first row (supabase always returns arrays with inserted rows)
    const [row] = data;

    // Create task object
    const taskObject = new Task(row);
    const newTaskData = {
        id: taskObject.id,
        task_name: taskObject.task_name,
        created_at: taskObject.created_at,
        priority: taskObject.priority,
        formattedDate: taskObject.formattedDate
    };

    // Successful insertion!
    return res.status(status).json({
        success: true,
        status: status,
        message: "Task added successfully!",
        task: newTaskData,
    });

}

// Delete task
export async function deleteTask(req, res) {
    // Grab request body (Task ID)
    const taskId = req.params.id;

    // Delete task from database based on ID
    const { data, error, status } = await supabase
        .from(`${TABLES.TASKS}`)
        .delete()
        .eq('id', taskId)
        .select();

    // If there is an error, return error
    if (error) {
        return res.status(400).json({ success: false, errorMessage: error.message });
    }

    // Grab first row (supabase always returns arrays with inserted rows)
    const [row] = data;

    // Create task object
    const taskObject = new Task(row);
    const deletedTaskData = {
        id: taskObject.id,
        task_name: taskObject.task_name,
        created_at: taskObject.created_at,
        priority: taskObject.priority,
        formattedDate: taskObject.formattedDate
    };

    // Return success
    return res.status(status).json({
        success: true,
        status: status,
        message: "Task deleted successfully!",
        task: deletedTaskData,
    });


}