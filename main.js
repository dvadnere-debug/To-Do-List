//selecting dom elements
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const completedList = document.getElementById("completed-list");
//let score = document.getElementByClass("score-box");
//creating a function to append the new tasks to the tasks array
let tasks = [];
let scored = 0;
let savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}

function addTask() {
  let taskText = input.value;
  if (taskText === "") return;

  tasks.push({
    text: taskText,
    completed: false,
  });

  input.value = ""; //clear the input
  console.log(tasks);
  saveTasks();
  showTasks();
}
// whenever user clicks the button, addTask will be called
addBtn.addEventListener("click", addTask);

// to show the taskslist on screen
function showTasks() {
  taskList.innerHTML = "";
  completedList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tasks[i].completed;

    let span = document.createElement("span");
    span.textContent = tasks[i].text;

    let deleteButton = document.createElement("buttton");
    deleteButton.textContent = "🗑️";
    deleteButton.onclick = function () {
      deleteTask(i);
    };

    checkbox.addEventListener("change", function () {
      tasks[i].completed = checkbox.checked;
      showTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    if (tasks[i].completed) {
      completedList.appendChild(li);
      scored++;
      console.log("current score is:", scored);
    } else {
      taskList.appendChild(li);
    }
  }
}

//for deleting any task
function deleteTask(index) {
  tasks.splice(index, 1);
  showTasks();
}

//saving to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
