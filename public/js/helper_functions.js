import { deleteTaskFromDatabase } from "./api_functions.js";

// Create task complete and edit buttons
export function createIconButton(src, alt, classes) {
    const button = document.createElement("button");
    button.classList.add(...classes);
    const icon = document.createElement("img");
    icon.src = src;
    icon.alt = alt;
    icon.classList.add("w-5", "h-5", "object-contain");
    button.appendChild(icon);
    return button;
}

// Clear the tasks container
export function clearTasksContainer(tasksContainer) {
    tasksContainer.innerHTML = "";

}

// Generate a task element
export function generateTaskElement(task) {

    // Assign classes to priority badge according to priority
    function getPriorityClasses(priority) {
        switch (priority) {
            case "low":
                return ["bg-blue-500/40", "text-blue-400", "priority-low-pulse"];
            case "medium":
                return [
                    "relative", "overflow-hidden", "rounded-full", "px-2", "py-1", // container styling
                    "text-white", // text stays readable
                    "priority-medium-shimmer" // animation
                ];
            case "high":
                return ["bg-red-500/50", "text-red-400", "priority-high-flicker"];
            default:
                return ["bg-gray-500/40", "text-gray-200"];
        }
    }


    // Centralized class definitions
    const taskClasses = {
        taskItemContainer: [
            "min-h-20", "cursor-pointer", "w-full", "flex", "items-center", "justify-between",
            "bg-cyber-accent/80", "border", "border-neon-blue/30", "rounded-xl",
            "px-4", "py-3", "shadow-lg", "hover:shadow-[0_0_15px_#0ff]", "transition-all",
            "fade-in-bottom-normal"
        ],
        leftTaskInfoContainer: ["max-w-50", "flex", "flex-col", "flex-1", "gap-1"],
        taskName: ["text-neon-pink", "text-sm", "font-bold", "flex", "items-center", "gap-2"],
        taskDate: ["text-xs", "text-neon-blue/70"],
        taskPriorityBadge: ["priority-badge", "px-2", "py-1", "rounded-full", "text-xs", "font-semibold", ...getPriorityClasses(task.priority)],
        rightTaskButtonsContainer: ["flex", "gap-2", "flex-shrink-0"],
        button: [
            "cursor-pointer", "p-2", "bg-neon-blue", "text-black", "rounded",
            "hover:bg-neon-blue/80", "transition-colors"
        ],
        buttonIcon: ["w-5", "h-5", "object-contain"]
    };

    // Create container for a single task
    const taskItemContainer = createElement("div", taskClasses.taskItemContainer)

    // Left container (task name + date)
    const leftTaskInfoContainer = createElement("div", taskClasses.leftTaskInfoContainer);

    // Task name
    const taskName = createElement("h3", taskClasses.taskName, task.task_name);

    

    // Task priority
    const taskPriorityBadge = createElement("span", taskClasses.taskPriorityBadge, task.priority);

    // Task date (always now)
    const date = task.formattedDate ?? new Date();
    const taskDate = createElement("p", taskClasses.taskDate, date);

    // Right container (buttons)
    const rightTaskButtonsContainer = createElement("div", taskClasses.rightTaskButtonsContainer);

    // Complete & Edit button
    const completeButton = createIconButton("./assets/icons/check-mark.png", "Complete", taskClasses.button);
    completeButton.id = `${task.id}`;
    const editButton = createIconButton("./assets/icons/editing.png", "Edit", taskClasses.button);

    // Complete button deletes task
    completeButton.addEventListener("click", async () => {
        // Delete task from database
        const deletedTask = await deleteTaskFromDatabase("/tasks", completeButton.id);
        console.log(deletedTask);

        // Animate task to disappear and remove
        fadeAndRemove(taskItemContainer);

    });

    // Build structure
    taskName.appendChild(taskPriorityBadge);
    leftTaskInfoContainer.appendChild(taskName);
    leftTaskInfoContainer.appendChild(taskDate);
    rightTaskButtonsContainer.appendChild(completeButton);
    rightTaskButtonsContainer.appendChild(editButton);
    taskItemContainer.appendChild(leftTaskInfoContainer);
    taskItemContainer.appendChild(rightTaskButtonsContainer);

    // return task item
    return taskItemContainer;
}

// Progress bar 
export function progressBar(progressBarAndTextContainer) {
    const progressBarClasses = {
        progressText: "text-neon-blue mb-2 text-xl text-center md:text-left",
        progressBarContainer: "w-full h-10 bg-black/20 rounded-lg mb-5 border-2 border-neon-blue/30",
        progressBar: "h-full w-0 bg-neon-pink rounded-lg progress-bar-animation"
    }

    const progressText = createElement("p", progressBarClasses.progressText.split(" "), "Retrieving Task Protocols...");
    const progressBarContainer = createElement("div", progressBarClasses.progressBarContainer.split(" "));
    const progressBar = createElement("div", progressBarClasses.progressBar.split(" "));

    progressBarAndTextContainer.appendChild(progressText);
    progressBarAndTextContainer.appendChild(progressBarContainer);
    progressBarContainer.appendChild(progressBar);


}

// Delay method
export async function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

// Fade and remove element
function fadeAndRemove(element) {
    if (!element) return;

    // Trigger the animation
    element.classList.add('fade-out');

    // Listen for animation to end, then remove from DOM
    element.addEventListener('animationend', () => {
        element.remove();
    }, { once: true });
}

// Create element with classes and optional styles
function createElement(tag, classes = [], text = "") {
    const el = document.createElement(tag);
    if (classes.length) el.classList.add(...classes);
    el.innerText = text;
    return el;
}

// Search input expands
export function expandSearchInput(searchInput, brandHeader) {
    searchInput.classList.add("w-50");
    searchInput.focus();

    brandHeader.classList.remove("text-2xl");
    brandHeader.classList.add("text-sm");
}

// Deploy Task Button reveals form
export function displayAddTaskForm(formContainer) {
    formContainer.classList.toggle("max-h-0");
    formContainer.classList.toggle("opacity-0");
    formContainer.classList.toggle("max-h-[500px]");
    formContainer.classList.toggle("opacity-100");
}

// Search input shrinks
export function shrinkSearchInput(searchInput, brandHeader) {
    searchInput.classList.remove("w-50");
    searchInput.classList.add("w-0");

    brandHeader.classList.remove("text-sm");
    brandHeader.classList.add("text-2xl");
}