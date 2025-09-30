// Fetch tasks from database
export async function fetchTasksFromDatabase(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success) {
        return data.tasks;
    }
    else {
        return data.errorMessage;
    }

}

// Add task to database
export async function addTaskToDatabase(apiUrl, taskInput) {

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskName: taskInput })
    });

    const data = await response.json();

    if (data.success) {
        return data.task;
    } else {
        return data.errorMessage;
    }
}

// Delete task from database
export async function deleteTaskFromDatabase(apiUrl, taskId) {

    const response = await fetch(`${apiUrl}/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();

    if (data.success) {
        return data.task;
    } else {
        return data.errorMessage;
    }
}