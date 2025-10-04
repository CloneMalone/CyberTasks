import {
    generateTaskElement,
    clearTasksContainer,
    sleep,
    progressBar,
    expandSearchInput,
    shrinkSearchInput,
    displayAddTaskForm
} from "./helper_functions.js";
import { fetchTasksFromDatabase, addTaskToDatabase } from "./api_functions.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Grab DOM elements
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    const tasksContainer = document.getElementById("tasksContainer");
    const progressBarAndTextContainer = document.getElementById("progressBarAndTextContainer");
    const brandHeader = document.getElementById("brandHeader");
    const formContainer = document.getElementById("taskFormContainer");
    const verticalLine = document.getElementById("verticalLine");
    const deployTaskButtonText = document.getElementById("deployTaskButtonText");


    // Clear tasks container
    clearTasksContainer(tasksContainer);

    // Retrieve all tasks, insert in tasks container
    progressBar(progressBarAndTextContainer);
    const tasks = await fetchTasksFromDatabase("/tasks");
    progressBarAndTextContainer.remove();
    for (const task of tasks) {
        const generatedTask = generateTaskElement(task);
        tasksContainer.appendChild(generatedTask);
        await sleep(150);
    }

    // Expand search input
    searchIcon.addEventListener("click", () => {
        expandSearchInput(searchInput, brandHeader, verticalLine);
    });

    // When Search input loses focus,
    // width decreases, brand header width increases
    searchInput.addEventListener("blur", () => {
        shrinkSearchInput(searchInput, brandHeader);
    });

    // Deploy task button unveils form
    document.getElementById("deployTaskButton").addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("minus");

        const classes = ["neon-glow", "flicker"];
        classes.forEach(cls => deployTaskButtonText.classList.toggle(cls));
        classes.forEach(cls => brandHeader.classList.toggle(cls));

        displayAddTaskForm(formContainer);
    });

    // Form submit, add task to database
    const addTaskForm = document.getElementById("taskForm");
    const addTaskInput = document.getElementById("taskInput");
    const selectPriorityOptions = document.getElementById("prioritySelect");

    addTaskForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Grab data from added task
        let addedTask = await addTaskToDatabase("/tasks", addTaskInput.value, selectPriorityOptions.value);

        // Generate new DOM task using that data
        const generatedTaskElement = generateTaskElement(addedTask);
        tasksContainer.prepend(generatedTaskElement);

        // Clear input
        addTaskInput.value = "";
    });


});



