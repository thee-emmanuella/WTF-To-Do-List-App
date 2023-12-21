// Create a simple todo list that has the following functionalities

/**
    * You can add a new item to the todo list (required)
    * You can remove an item from the todo list (required)
    * You can edit an item in the todo list (optional)

 * 
    Some further requirements:
    - the input field must be reset when the add button is clicked on 
    - prevent empty values from being added to the list
    - the todo list must show the most recently added item first on the list
    - the todo list should be stored using localStorage. 
      So, when the page is reloaded, any item in the todo list will still be displayed on the web page
 */

let addButton = document.getElementById("add-button");
let inputText = document.getElementById("new-task");
let toDoItems = document.getElementById("incomplete-tasks");

// Load items from local storage when page loads
let todoList = JSON.parse(localStorage.getItem("items")) || [];

addButton.addEventListener("click", addItem);

function addItem() {
  let task = inputText.value;
  if (task !== "") {
    todoList.unshift(task);
    updateTaskList();
    inputText.value = "";
  } else if (task === "") {
    alert("Please enter a task!");
  }
}

function updateTaskList() {
  toDoItems.innerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    let task = todoList[i];
    let listItem = document.createElement("div");
    let taskText = document.createTextNode(task);

    let buttonDiv = document.createElement("div");

    let editButton = document.createElement("button");
    let editButtonText = document.createTextNode("Edit");
    editButton.appendChild(editButtonText);
    editButton.id = "edit-button";
    editButton.addEventListener("click", function () {
      editItem(i);
    });

    let deleteButton = document.createElement("button");
    let deleteButtonText = document.createTextNode("Delete");
    deleteButton.appendChild(deleteButtonText);
    deleteButton.id = "delete-button";
    deleteButton.addEventListener("click", function () {
      deleteItem(i);
    });

    listItem.appendChild(taskText);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    listItem.appendChild(buttonDiv);
    toDoItems.appendChild(listItem);
  }

  localStorage.setItem("items", JSON.stringify(todoList));
}

function editItem(i) {
  let task = todoList[i];
  let newTask = prompt("Edit task", task);
  if (newTask !== null && newTask !== "") {
    todoList[i] = newTask;
    updateTaskList();
  }
}

function deleteItem(i) {
  todoList.splice(i, 1);
  localStorage.removeItem("items");
  updateTaskList();
}

updateTaskList();
