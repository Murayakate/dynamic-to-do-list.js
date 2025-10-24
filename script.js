// Wait until the whole HTML page (DOM) is loaded before running our script.
// This ensures elements like the input and button exist when we try to access them.
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(taskText) { 
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        //add style class to button
        removeBtn.className = 'removeBtn';
        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li);

            tasks = tasks.filter(function(t) {
                return t !== taskText;
            });

           
            saveTasks();
        });

    
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            // alert() shows a small message box to the user.
            alert('Please enter a task.');
            return; // stop the function early
        }

        // Add the new task to the array we keep in memory.
        tasks.push(taskText);

        // Save the updated array to localStorage so it stays after reload.
        saveTasks();

        // Visually add the task to the page so the user sees it right away.
        createTaskElement(taskText);

        // Clear the input box so the user can type a new task.
        taskInput.value = '';
    }

    function loadTasks() {
        // localStorage.getItem('tasks') returns either the saved string or null
        // if nothing was saved yet. We check for that before parsing.
        const storedTasks = localStorage.getItem('tasks');

        // If there is something stored, convert the JSON string back into an array.
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);

            tasks.forEach(function(taskText) {
                // createTaskElement creates an <li> with the task text and a remove button.
                createTaskElement(taskText);
            });
        }
    }
    // When the user clicks the Add button, run the addTask function.
    addButton.addEventListener('click', addTask);

    // Also allow adding tasks by pressing Enter in the input box.
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // When the page loads, read any saved tasks and show them on screen.
    loadTasks();
});
