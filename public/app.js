const fetchAndDisplayTasks = (tasks) => {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        // Container for a single task
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add(
            "h-20",
            "cursor-pointer",
            "w-full",
            "flex",
            "items-center",
            "justify-between",
            "bg-cyber-accent/80",
            "border",
            "border-neon-blue/30",
            "rounded-xl",
            "px-4",
            "py-3",
            "shadow-lg",
            "hover:shadow-[0_0_15px_#0ff]",
            "transition-all"
        );

        // Container for task name and date
        const leftTaskInfoContainer = document.createElement("div");
        leftTaskInfoContainer.classList.add("max-w-50");

        // Name
        const taskName = document.createElement("h3");
        taskName.classList.add("text-neon-pink", "text-sm", "font-bold");
        taskName.innerText = task.taskName;

        // Date
        const taskDate = document.createElement("p");
        taskDate.innerText = task.dateCreated;
        taskDate.classList.add("text-xs", "text-neon-blue/70");

        // Container for buttons
        const rightTaskButtonsContainer = document.createElement("div");
        rightTaskButtonsContainer.classList.add("flex", "gap-2");

        // Button classlist (Both are the same)
        const buttonClassesString = "cursor-pointer p-2 bg-neon-blue text-black rounded hover:bg-neon-blue/80 transition-colors";
        const buttonImgClassesString = "w-5 h-5 object-contain";

        // Complete Button
        const completeButton = document.createElement("button");
        completeButton.classList.add(...buttonClassesString.split(' '));
        const completeButtonIcon = document.createElement("img");
        completeButtonIcon.src = "./assets/icons/check-mark.png";
        completeButtonIcon.alt = "Complete"; // good for accessibility
        completeButtonIcon.classList.add(...buttonImgClassesString.split(' '));
        completeButton.appendChild(completeButtonIcon); // ✅ append icon to button

        // Edit Button
        const editButton = document.createElement("button");
        editButton.classList.add(...buttonClassesString.split(' '));
        const editButtonIcon = document.createElement("img");
        editButtonIcon.src = "./assets/icons/editing.png";
        editButtonIcon.alt = "Edit";
        editButtonIcon.classList.add(...buttonImgClassesString.split(' '));
        editButton.appendChild(editButtonIcon); // ✅ append icon to button

        // Append left and right containers to main single task container
        taskItemContainer.appendChild(leftTaskInfoContainer);
        taskItemContainer.appendChild(rightTaskButtonsContainer);

        // Append task name and date to Left container
        leftTaskInfoContainer.appendChild(taskName);
        leftTaskInfoContainer.appendChild(taskDate);

        // Append buttons to right container,
        rightTaskButtonsContainer.appendChild(completeButton);
        rightTaskButtonsContainer.appendChild(editButton);

        // Appending entire task to tasks container
        taskContainer.appendChild(taskItemContainer);


    });
}



document.addEventListener("DOMContentLoaded", () => {
    const taskDummyData = [
        {
            taskName: "Take Out The Trash",
            dateCreated: new Date("2025-09-18T08:30:00").toLocaleDateString()
        },
        {
            taskName: "Finish Cyber UI Mockups",
            dateCreated: new Date("2025-09-17T14:15:00").toLocaleDateString()
        },
        {
            taskName: "Refactor Authentication Module",
            dateCreated: new Date("2025-09-16T09:45:00").toLocaleDateString()
        },
        {
            taskName: "Write Blog Post: 'Neon Design Trends'",
            dateCreated: new Date("2025-09-15T20:10:00").toLocaleDateString()
        },
        {
            taskName: "Backup Database",
            dateCreated: new Date("2025-09-14T11:00:00").toLocaleDateString()
        }
    ];

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

    // Pull all tasks from database and populate task container
    // (testing with dummy data to solidify UI behavior)
    fetchAndDisplayTasks(taskDummyData);

    // Form submit, add task to database
    // (dummy tasks for now)
    const addTaskForm = document.getElementById("taskForm");
    const addTaskInput = document.getElementById("taskInput");

    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        taskDummyData.unshift(
            {
                taskName: addTaskInput.value,
                dateCreated: new Date().toLocaleDateString()
            }
        );

        fetchAndDisplayTasks(taskDummyData);


        
    });



});