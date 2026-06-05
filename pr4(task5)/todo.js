// Отримуємо елементи зі сторінки
const form = document.querySelector("#add-form");
const input = document.querySelector("#new-task");
const taskList = document.querySelector("#task-list");
const counter = document.querySelector("#counter");
const clearDoneButton = document.querySelector("#clear-done");

// Оновлює текст лічильника
function updateCounter() {
  const allTasks = taskList.querySelectorAll("li");
  const doneTasks = taskList.querySelectorAll("li.done");

  counter.textContent = `${doneTasks.length} з ${allTasks.length} завершено`;
}

// Створює новий елемент задачі (li)
function createTask(text) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.type = "button";
  deleteButton.textContent = "x";

  li.append(checkbox, span, deleteButton);

  return li;
}

// Додавання нової задачі через submit форми
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();

  if (taskText === "") {
    return;
  }

  const task = createTask(taskText);
  taskList.appendChild(task);

  input.value = "";
  input.focus();

  updateCounter();
});

// Event delegation для checkbox та кнопки видалення
taskList.addEventListener("click", function (event) {
  const target = event.target;
  const li = target.closest("li");

  if (!li) {
    return;
  }

  if (target.matches('input[type="checkbox"]')) {
    li.classList.toggle("done", target.checked);
    updateCounter();
  }

  if (target.classList.contains("delete")) {
    li.remove();
    updateCounter();
  }
});

// Видалення всіх завершених задач
clearDoneButton.addEventListener("click", function () {
  const doneTasks = taskList.querySelectorAll("li.done");

  doneTasks.forEach(function (task) {
    task.remove();
  });

  updateCounter();
});

updateCounter();