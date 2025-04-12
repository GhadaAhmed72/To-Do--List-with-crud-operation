var container = document.createElement("div");
container.classList.add("container");
var h2 = document.createElement("h2");
var content = document.createTextNode("To-Do List ");
h2.appendChild(content);
container.appendChild(h2);
var inputContainer = document.createElement("div");
inputContainer.classList.add("inputContainer");
var input = document.createElement("input");
input.classList.add("input-style");
input.placeholder = "Enter a task";
inputContainer.appendChild(input);
container.appendChild(inputContainer);
document.body.appendChild(container);
var buttonContainer = document.createElement("div");
buttonContainer.classList.add("buttonContainer");
var addButton = document.createElement("button");
var buttonData = document.createTextNode("Add");
addButton.appendChild(buttonData);
addButton.classList.add("buttonData");
buttonContainer.appendChild(addButton);
inputContainer.appendChild(buttonContainer);
var noDisplayedTasks = document.createElement("div");
noDisplayedTasks.classList.add("noDisplayedData");
var h3 = document.createElement("h3");
var nodisplay = document.createTextNode("No Tasks to Display");
h3.appendChild(nodisplay);
noDisplayedTasks.appendChild(h3);
container.appendChild(noDisplayedTasks);
// Load from localStorage
var storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
storedTasks.forEach(function (task) { return addTask(task, false); });
// Add task
function addTask(taskData, saveToStorage) {
    if (saveToStorage === void 0) { saveToStorage = true; }
    var toDoTask = document.createElement("div");
    toDoTask.classList.add("to-do-task-line-style");
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = "myCheckbox";
    checkBox.classList.add("checkbox-style");
    toDoTask.appendChild(checkBox);
    var p = document.createElement("p");
    p.classList.add("task-data");
    var toDoTaskData = document.createTextNode(taskData);
    p.appendChild(toDoTaskData);
    toDoTask.appendChild(p);
    var editButton = document.createElement("button");
    var editButtonContent = document.createTextNode("Edit");
    editButton.appendChild(editButtonContent);
    editButton.classList.add("edit-button");
    toDoTask.appendChild(editButton);
    var deleteButton = document.createElement("button");
    var deleteButtonContent = document.createTextNode("Delete");
    deleteButton.appendChild(deleteButtonContent);
    deleteButton.classList.add("delete-button");
    toDoTask.appendChild(deleteButton);
    document.body.appendChild(toDoTask);
    input.value = "";
    checkBox.addEventListener("change", function () {
        if (checkBox.checked) {
            p.style.textDecoration = "line-through";
        }
        else {
            p.style.textDecoration = "none";
        }
    });
    // delete task
    deleteButton.addEventListener("click", function () {
        toDoTask.remove();
        var currentTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        currentTasks = currentTasks.filter(function (t) { return t !== p.textContent; });
        localStorage.setItem("tasks", JSON.stringify(currentTasks));
        noDisplay();
    });
    // edit task
    editButton.addEventListener("click", function () {
        var editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = p.textContent || "";
        editInput.classList.add("edit-input");
        var cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("cancel-button");
        toDoTask.replaceChild(editInput, p);
        toDoTask.appendChild(cancelButton);
        checkBox.style.display = "none";
        deleteButton.style.display = "none";
        editButton.style.display = "none";
        editInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                var newValue = editInput.value.trim();
                if (newValue !== "") {
                    var storedTasks_1 = JSON.parse(localStorage.getItem("tasks") || "[]");
                    var index = storedTasks_1.indexOf(p.textContent || "");
                    if (index !== -1) {
                        storedTasks_1[index] = newValue;
                        localStorage.setItem("tasks", JSON.stringify(storedTasks_1));
                    }
                    p.textContent = newValue;
                    toDoTask.replaceChild(p, editInput);
                    toDoTask.removeChild(cancelButton);
                    checkBox.style.display = "block";
                    deleteButton.style.display = "block";
                    editButton.style.display = "block";
                }
                else {
                    alert("Task cannot be empty.");
                }
            }
        });
        cancelButton.addEventListener("click", function () {
            toDoTask.replaceChild(p, editInput);
            toDoTask.removeChild(cancelButton);
            checkBox.style.display = "block";
            deleteButton.style.display = "block";
            editButton.style.display = "block";
        });
    });
    container.appendChild(toDoTask);
    noDisplay();
    if (saveToStorage) {
        var storedTasks_2 = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks_2.push(taskData);
        localStorage.setItem("tasks", JSON.stringify(storedTasks_2));
    }
}
// add task
addButton.addEventListener("click", function () {
    var taskData = input.value.trim();
    if (taskData !== "") {
        addTask(taskData);
    }
    else {
        alert("Please enter a task.");
    }
});
function noDisplay() {
    var tasks = container.querySelectorAll(".to-do-task-line-style");
    if (tasks.length === 0) {
        noDisplayedTasks.style.display = "block";
    }
    else {
        noDisplayedTasks.style.display = "none";
    }
}
