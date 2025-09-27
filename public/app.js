document.addEventListener("DOMContentLoaded", async () => {
    // Grab DOM elements
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    const brandHeader = document.getElementById("brandHeader");
    const tasksContainer = document.getElementById("tasksContainer");

    // Clear tasks container
    clearTasksContainer(tasksContainer);

    // Retrieve all tasks, insert in tasks container
    const tasks = await fetchTasksFromDatabase("/tasks");
    for (const task of tasks) {
        const generatedTask = generateTaskElement(task);
        tasksContainer.appendChild(generatedTask);
        await sleep(150);
    }


    // When Search icon is clicked, search input
    // width increases, brand header width decreases
    searchIcon.addEventListener("click", () => {
        searchInput.classList.add("w-50");
        searchInput.focus();

        brandHeader.classList.remove("text-2xl");
        brandHeader.classList.add("text-sm");
    });

    // When Search input loses focus,
    // width decreases, brand header width increases
    searchInput.addEventListener("blur", () => {
        searchInput.classList.remove("w-50");
        searchInput.classList.add("w-0");

        brandHeader.classList.remove("text-sm");
        brandHeader.classList.add("text-2xl");
    });

    // Deploy task button unveils form
    document.getElementById("deploytaskButton").addEventListener("click", () => {
        const formContainer = document.getElementById("taskFormContainer");
        formContainer.classList.toggle("max-h-0");
        formContainer.classList.toggle("opacity-0");
        formContainer.classList.toggle("max-h-[500px]");
        formContainer.classList.toggle("opacity-100");
    });

    // Form submit, add task to database
    const addTaskForm = document.getElementById("taskForm");
    const addTaskInput = document.getElementById("taskInput");

    addTaskForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Grab data from added task
        let addedTask = await addTaskToDatabase("/tasks", addTaskInput.value);
        addedTask = addedTask[0];

        // Generate new DOM task using that data
        const generatedTaskElement = generateTaskElement(addedTask);
        tasksContainer.prepend(generatedTaskElement);

    });



});


// Clear the tasks container
function clearTasksContainer(tasksContainer) {
    tasksContainer.innerHTML = "";

}

// Generate a task element
function generateTaskElement(task) {
    // Centralized class definitions
    const taskClasses = {
        taskItemContainer: [
            "h-20", "cursor-pointer", "w-full", "flex", "items-center", "justify-between",
            "bg-cyber-accent/80", "border", "border-neon-blue/30", "rounded-xl",
            "px-4", "py-3", "shadow-lg", "hover:shadow-[0_0_15px_#0ff]", "transition-all",
            "fade-in-bottom-normal"
        ],
        leftTaskInfoContainer: ["max-w-50"],
        taskName: ["text-neon-pink", "text-sm", "font-bold"],
        taskDate: ["text-xs", "text-neon-blue/70"],
        rightTaskButtonsContainer: ["flex", "gap-2"],
        button: [
            "cursor-pointer", "p-2", "bg-neon-blue", "text-black", "rounded",
            "hover:bg-neon-blue/80", "transition-colors"
        ],
        buttonIcon: ["w-5", "h-5", "object-contain"]
    };

    // Create container for a single task
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add(...taskClasses.taskItemContainer);

    // Left container (task name + date)
    const leftTaskInfoContainer = document.createElement("div");
    leftTaskInfoContainer.classList.add(...taskClasses.leftTaskInfoContainer);

    // Task name
    const taskName = document.createElement("h3");
    taskName.classList.add(...taskClasses.taskName);
    taskName.innerText = task.task_name;

    // Task date (always now)
    const taskDate = document.createElement("p");
    const date = task.created_at ? new Date(task.created_at) : new Date();
    taskDate.innerText = date.toLocaleString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
    taskDate.classList.add(...taskClasses.taskDate);

    // Right container (buttons)
    const rightTaskButtonsContainer = document.createElement("div");
    rightTaskButtonsContainer.classList.add(...taskClasses.rightTaskButtonsContainer);

    // Complete & Edit button
    const completeButton = createIconButton("./assets/icons/check-mark.png", "Complete", taskClasses.button);
    const editButton = createIconButton("./assets/icons/editing.png", "Edit", taskClasses.button);

    // Build structure
    leftTaskInfoContainer.appendChild(taskName);
    leftTaskInfoContainer.appendChild(taskDate);
    rightTaskButtonsContainer.appendChild(completeButton);
    rightTaskButtonsContainer.appendChild(editButton);
    taskItemContainer.appendChild(leftTaskInfoContainer);
    taskItemContainer.appendChild(rightTaskButtonsContainer);

    // return task item
    return taskItemContainer;
}


// Fetch tasks from database
async function fetchTasksFromDatabase(apiUrl) {
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
async function addTaskToDatabase(apiUrl, taskInput) {

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


// Create task complete and edit buttons
function createIconButton(src, alt, classes) {
    const button = document.createElement("button");
    button.classList.add(...classes);
    const icon = document.createElement("img");
    icon.src = src;
    icon.alt = alt;
    icon.classList.add("w-5", "h-5", "object-contain");
    button.appendChild(icon);
    return button;
}

// Delay method
async function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}
