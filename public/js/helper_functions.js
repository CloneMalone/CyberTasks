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
    const taskItemContainer = createElement("div", taskClasses.taskItemContainer)

    // Left container (task name + date)
    const leftTaskInfoContainer = createElement("div", taskClasses.leftTaskInfoContainer);

    // Task name
    const taskName = createElement("h3", taskClasses.taskName, task.task_name);

    // Task date (always now)
    const date = task.created_at ? new Date(task.created_at) : new Date();
    const taskDate = createElement("p", taskClasses.taskDate, date.toLocaleString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }));

    // Right container (buttons)
    const rightTaskButtonsContainer = createElement("div", taskClasses.rightTaskButtonsContainer);

    // Complete & Edit button
    const completeButton = createIconButton("./assets/icons/check-mark.png", "Complete", taskClasses.button);
    completeButton.id = `${task.id}`;
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

// Helper: Create element with classes and optional styles
function createElement(tag, classes = [], text = "") {
    const el = document.createElement(tag);
    if (classes.length) el.classList.add(...classes);
    el.innerText = text;
    return el;
}