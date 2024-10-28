const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function AddinginDOM() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        taskContent.textContent = task;
        li.appendChild(taskContent);
        
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => editTask(index);
        buttonGroup.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteTask(index);
        buttonGroup.appendChild(deleteButton);

        li.appendChild(buttonGroup);
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskTitle = taskInput.value.trim(); 
    if (taskTitle) {
        tasks.push(taskTitle);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        AddinginDOM();
    } else {
        alert("Please enter a task!"); 
    }
}

function editTask(index) {
    const newTitle = prompt('Edit task:', tasks[index]);
    if (newTitle) {
        tasks[index] = newTitle;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        AddinginDOM();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    AddinginDOM();
}

addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

AddinginDOM();
