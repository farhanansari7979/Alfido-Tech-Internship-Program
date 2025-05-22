document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const clearAll = document.getElementById('clearAll');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let dragItem = null;

    // Load tasks from localStorage
    function loadTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            createTaskElement(task, index);
        });
        updateTaskCount();
    }

    // Create a new task element
    function createTaskElement(task, index) {
        const li = document.createElement('li');
        li.className = 'task new-task';
        li.setAttribute('data-index', index);
        li.draggable = true;

        li.innerHTML = `
            <span class="task-text">${task}</span>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;

        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.classList.add('deleting');
            setTimeout(() => {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                loadTasks();
            }, 300);
        });

        // Drag & Drop
        li.addEventListener('dragstart', function() {
            dragItem = li;
            setTimeout(() => li.classList.add('dragging'), 0);
        });

        li.addEventListener('dragend', function() {
            li.classList.remove('dragging');
        });

        taskList.appendChild(li);
    }

    // Add new task
    addBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            loadTasks();
        }
    });

    // Enter key to add task
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    // Clear all tasks
    clearAll.addEventListener('click', function() {
        if (tasks.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
            tasks = [];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        }
    });

    // Update task counter
    function updateTaskCount() {
        taskCount.textContent = `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`;
    }

    // Drag & Drop reordering
    taskList.addEventListener('dragover', function(e) {
        e.preventDefault();
        const afterElement = getDragAfterElement(e.clientY);
        if (afterElement) {
            taskList.insertBefore(dragItem, afterElement);
        } else {
            taskList.appendChild(dragItem);
        }
    });

    function getDragAfterElement(y) {
        const draggableElements = [...taskList.querySelectorAll('.task:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Initialize
    loadTasks();
});