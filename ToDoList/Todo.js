const taskInput = document.getElementById('taskInput');
const tasksContainer = document.getElementById('tasks');
const completedTasksContainer = document.getElementById('completedTasks');

// Function to create a new task item
function createTaskItem(taskName, timestamp, isCompleted) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem');
    if (isCompleted) {
        taskItem.classList.add('completed');
    }
    taskItem.innerHTML = `
        <div class= "taskName">${taskName} - ${timestamp}</div>
        <button onclick="toggleComplete(this)">Mark ${isCompleted ? 'Incomplete' : 'Complete'}</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    return taskItem;
}

// Function to add a new task
function addTask() {
    const taskName = taskInput.value;
    if (taskName.trim() !== '') {
        const timestamp = new Date().toLocaleString();
        const taskItem = createTaskItem(taskName, timestamp, false);
        tasksContainer.appendChild(taskItem);
        taskInput.value = '';
    }
}
// Function to toggle task completion status
function toggleComplete(button) {
    const taskItem = button.parentElement;
    const isCompleted = taskItem.classList.toggle('completed');
    button.textContent = isCompleted ? 'Mark Incomplete' : 'Mark Complete';
    const timestamp = new Date().toLocaleString();
    taskItem.children[0].textContent = taskItem.children[0].textContent.replace(/(Added|Completed):.*$/, 'Completed: ' + timestamp);
    const destination = isCompleted ? completedTasksContainer : tasksContainer;
    destination.appendChild(taskItem);
}

// Function to delete a task
function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}

// Function to clear all tasks
function clearAll() {
    tasksContainer.innerHTML = '';
    completedTasksContainer.innerHTML = '';
}

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask()
    }
});