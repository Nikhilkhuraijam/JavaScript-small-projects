const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const task = taskInput.value.trim();
  if (task === "") return;

  createTaskElement(task);
  saveTask(task);

  taskInput.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = () => {
    li.remove();
    removeTask(task);
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));
}

// Remove task from localStorage
function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
