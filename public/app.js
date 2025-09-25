document.addEventListener("DOMContentLoaded", () => {
    // Grab DOM elements
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    const brandHeader = document.getElementById("brandHeader");

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

        generateTaskElement(addTaskInput.value);
        await fetchTasks("/tasks");

    });



});


// Generate a task element
function generateTaskElement(taskNameInput) {
    // Centralized class definitions
    const taskClasses = {
        taskItemContainer: [
            "h-20", "cursor-pointer", "w-full", "flex", "items-center", "justify-between",
            "bg-cyber-accent/80", "border", "border-neon-blue/30", "rounded-xl",
            "px-4", "py-3", "shadow-lg", "hover:shadow-[0_0_15px_#0ff]", "transition-all"
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


    const tasksContainer = document.getElementById("tasksContainer");

    // Create container for a single task
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add(...taskClasses.taskItemContainer);

    // Left container (task name + date)
    const leftTaskInfoContainer = document.createElement("div");
    leftTaskInfoContainer.classList.add(...taskClasses.leftTaskInfoContainer);

    // Task name
    const taskName = document.createElement("h3");
    taskName.classList.add(...taskClasses.taskName);
    taskName.innerText = taskNameInput;

    // Task date (always now)
    const taskDate = document.createElement("p");
    const now = new Date();
    taskDate.innerText = now.toLocaleString([], {
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

    // ✅ Complete Button
    const completeButton = document.createElement("button");
    completeButton.classList.add(...taskClasses.button);
    const completeIcon = document.createElement("img");
    completeIcon.src = "./assets/icons/check-mark.png";
    completeIcon.alt = "Complete";
    completeIcon.classList.add(...taskClasses.buttonIcon);
    completeButton.appendChild(completeIcon);

    // ✅ Edit Button
    const editButton = document.createElement("button");
    editButton.classList.add(...taskClasses.button);
    const editIcon = document.createElement("img");
    editIcon.src = "./assets/icons/editing.png";
    editIcon.alt = "Edit";
    editIcon.classList.add(...taskClasses.buttonIcon);
    editButton.appendChild(editIcon);

    // Build structure
    leftTaskInfoContainer.appendChild(taskName);
    leftTaskInfoContainer.appendChild(taskDate);
    rightTaskButtonsContainer.appendChild(completeButton);
    rightTaskButtonsContainer.appendChild(editButton);
    taskItemContainer.appendChild(leftTaskInfoContainer);
    taskItemContainer.appendChild(rightTaskButtonsContainer);

    // Add to container
    tasksContainer.appendChild(taskItemContainer);
}


// API Test
async function fetchTasks(apiUrl) {
    await fetch(apiUrl);
}
