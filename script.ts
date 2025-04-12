let container: HTMLDivElement = document.createElement("div") as HTMLDivElement;
container.classList.add("container");

let h2: HTMLHeadingElement = document.createElement("h2") as HTMLHeadingElement;
let content = document.createTextNode("To-Do List ");
h2.appendChild(content);
container.appendChild(h2);

let inputContainer: HTMLDivElement = document.createElement(
  "div"
) as HTMLDivElement;
inputContainer.classList.add("inputContainer");
let input: HTMLInputElement = document.createElement(
  "input"
) as HTMLInputElement;
input.classList.add("input-style");
input.placeholder = "Enter a task";
inputContainer.appendChild(input);
container.appendChild(inputContainer);
document.body.appendChild(container);

let buttonContainer: HTMLDivElement = document.createElement(
  "div"
) as HTMLDivElement;
buttonContainer.classList.add("buttonContainer");
let addButton: HTMLButtonElement = document.createElement(
  "button"
) as HTMLButtonElement;
let buttonData = document.createTextNode("Add");
addButton.appendChild(buttonData);
addButton.classList.add("buttonData");
buttonContainer.appendChild(addButton);
inputContainer.appendChild(buttonContainer);

// let toDoContainer = document.createElement("div");
// toDoContainer.classList.add("toDoContainer");

// toDoContainer.appendChild(toDoTask)

function addTask(taskData: string): void {
  let toDoTask: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  toDoTask.classList.add("to-do-task-line-style");
  let checkBox: HTMLInputElement = document.createElement(
    "input"
  ) as HTMLInputElement;
  checkBox.type = "checkbox";
  checkBox.id = "myCheckbox";
  checkBox.classList.add("checkbox-style");
  toDoTask.appendChild(checkBox);

  let p: HTMLParagraphElement = document.createElement(
    "p"
  ) as HTMLParagraphElement;
  p.classList.add("task-data")
  let toDoTaskData = document.createTextNode(taskData);
  p.appendChild(toDoTaskData);
  toDoTask.appendChild(p);

  let editButton: HTMLButtonElement = document.createElement(
    "button"
  ) as HTMLButtonElement;
  let editButtonContent = document.createTextNode("Edit");
  editButton.appendChild(editButtonContent);
  editButton.classList.add("edit-button");
  toDoTask.appendChild(editButton);

  let deleteButton: HTMLButtonElement = document.createElement(
    "button"
  ) as HTMLButtonElement;
  let deleteButtonContent = document.createTextNode("Delete");
  deleteButton.appendChild(deleteButtonContent);
  deleteButton.classList.add("delete-button");
  toDoTask.appendChild(deleteButton);
  document.body.appendChild(toDoTask);

  input.value="";

  checkBox.addEventListener("change", function():void{
    if(checkBox.checked){
    p.style.textDecoration = "line-through"
    }

    else{
        p.style.textDecoration = "none"

    }
  
  })

  //delete task
  deleteButton.addEventListener("click", function():void{
    toDoTask.remove();
   
  })


//   edit task
editButton.addEventListener("click", function(): void {
    // Create input field for editing
    let editInput: HTMLInputElement = document.createElement("input") as HTMLInputElement;
    editInput.type = "text";
    editInput.value = p.textContent || "";
    editInput.classList.add("edit-input"); 

    // Create cancel button
    let cancelButton: HTMLButtonElement = document.createElement("button") as HTMLButtonElement;
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel-button");
    toDoTask.replaceChild(editInput, p);

    toDoTask.appendChild(cancelButton);
    checkBox.style.display = "none";
    deleteButton.style.display = "none";
    editButton.style.display = "none"; 

    editInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const newValue = editInput.value.trim();
            if (newValue !== "") {
                p.textContent = newValue;
                toDoTask.replaceChild(p, editInput); 
             
                toDoTask.removeChild(cancelButton);
                checkBox.style.display = "block";
                deleteButton.style.display = "block";
                editButton.style.display = "block"; 
            } else {
                alert("Task cannot be empty.");
            }
        }
        
    });

    cancelButton.addEventListener("click", function(): void {
        toDoTask.replaceChild(p, editInput);
        toDoTask.removeChild(cancelButton);
        checkBox.style.display = "block";
        deleteButton.style.display = "block";
        editButton.style.display = "block"; 
    });
});

 container.appendChild(toDoTask)
}

// add task
addButton.addEventListener("click", function():void{
  let taskData = input.value.trim();
  if (taskData !== "") {
    addTask(taskData);
  } else {
    alert("Please enter a task.");
  }
});
