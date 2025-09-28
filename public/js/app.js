import {
    generateTaskElement,
    clearTasksContainer,
    sleep,
    progressBar
} from "./helper_functions.js";

import { fetchTasksFromDatabase, addTaskToDatabase } from "./api_functions.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Grab DOM elements
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    const brandHeader = document.getElementById("brandHeader");
    const tasksContainer = document.getElementById("tasksContainer");
    const progressBarAndTextContainer = document.getElementById("progressBarAndTextContainer");

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

        // Clear input
        addTaskInput.value = "";
        addTaskInput.focus();
    });



});



