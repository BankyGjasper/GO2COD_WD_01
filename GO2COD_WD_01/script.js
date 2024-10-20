// Select DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Task array to store all tasks
let tasks = [];

// Load tasks from localStorage (if any)
window.onload = function() {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        renderTasks();
    }
};

// Event listener for adding a new task
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskValue = taskInput.value.trim();
    
    // Form validation: ensure the task is not empty
    if (taskValue === '') {
        alert('Task cannot be empty');
        return;
    }
    
    // Create a new task object
    const newTask = {
        id: Date.now(),  // Unique ID for each task
        text: taskValue
    };
    
    // Add the task to the tasks array
    tasks.push(newTask);
    saveAndRenderTasks();
    
    // Clear the input field after adding the task
    taskInput.value = '';
});

// Render tasks to the DOM
function renderTasks() {
    // Clear the current list
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        // Create a new list item
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        // Add the new list item to the task list
        taskList.appendChild(li);
    });
}

// Save tasks to localStorage and render them
function saveAndRenderTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Edit a task
function editTask(taskId) {
    const taskToEdit = tasks.find(task => task.id === taskId);
    const newTaskText = prompt('Edit Task:', taskToEdit.text);
    
    // Form validation: ensure the new task is not empty
    if (newTaskText === null || newTaskText.trim() === '') {
        alert('Task cannot be empty');
        return;
    }
    
    // Update the task text
    taskToEdit.text = newTaskText;
    saveAndRenderTasks();
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveAndRenderTasks();
}
