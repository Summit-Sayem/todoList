//Retrieve Saved Tasks

let savedTasks = [];

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem("savedTasks") == null) {
        return;
    }

    else {
        savedTasks = JSON.parse(localStorage.getItem("savedTasks"));

        for (let i = 0; i < savedTasks.length; i++) {
            createTask(savedTasks[i].ID, savedTasks[i].Heading, savedTasks[i].isChecked, "retrieveTasks");
        }

        return;
    }
})

//Set Theme

const themeButton = document.querySelector(".setTheme");

themeButton.addEventListener("click", switchTheme);

function switchTheme() {
    const color = document.querySelector(":root");

    color.classList.toggle("dark");

    console.log("Theme Set");

    return;
}

//New Task Input

const addButton = document.querySelector('.addTask');
const taskContainer = document.querySelector('.taskContainer');

let inputHeading = document.querySelector('.taskHeading');

addButton.addEventListener("click", function() {
    if (inputHeading.value == "") {
        alert("Please Enter a Task");

        inputHeading.focus();

        return;
    }

    else if (inputHeading.value == "Summit Sayem") {
        alert("Hello World!");

        inputHeading.value = "";
        inputHeading.focus();

        return;
    }

    else if (inputHeading.value == "clearAll") {
        localStorage.clear();
        location.reload();

        alert("Tasks Cleared");

        inputHeading.value = "";
        inputHeading.focus();

        return;
    }

    else {
        let task = {
            ID: "#" + Math.floor(Date.now() + Math.random()),
            Heading: inputHeading.value,
            isChecked: false
        };

        createTask(task.ID, task.Heading, task.isChecked, "addButton");

        savedTasks.push(task);
        localStorage.setItem('savedTasks', JSON.stringify(savedTasks))

        inputHeading.value = "";
        inputHeading.focus();

        console.log("Task Added");

        return;
    }
});

//Return Key Functionality

inputHeading.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addButton.click();

        return;
    }

    else {
        return;
    }
})

//Create Task

function createTask(taskID, taskHeading, taskisChecked, event) {
    const newDiv = document.createElement('div');
    const newP = document.createElement('p');
    const newP2 = document.createElement('p');
    const completeButton = document.createElement('button');
    const removeButton = document.createElement('button');

    newP.append(taskID);
    newP2.append(taskHeading);
    completeButton.append("✓");
    removeButton.append("-");

    newDiv.appendChild(newP);
    newDiv.appendChild(newP2);
    newDiv.appendChild(completeButton);
    newDiv.appendChild(removeButton);
    taskContainer.appendChild(newDiv);

    newDiv.classList.add('prevTask');
    newP.classList.add('idTask');
    newP2.classList.add('headerTask');
    completeButton.classList.add('completeTask');
    removeButton.classList.add('removeTask');

    completeButton.addEventListener("click", completeTask);
    removeButton.addEventListener("click", removeTask);

    if (taskisChecked === true) {
        newP2.classList.add('completed');
        completeButton.classList.add('checked');

        return;
    }

    else {
        return;
    }
}

//Remove Task

function removeTask(event) {
    let taskSelect = event.target.parentElement;
    let idSelect = taskSelect.firstChild.innerText;

    taskSelect.classList.add("slideOut");

    taskSelect.addEventListener("transitionend", function() {
        taskSelect.remove();
    });

    //let index = savedTasks.findIndex( (task) => task.ID === idSelect);
    let index = findTask(idSelect);

    savedTasks.splice(index, 1);
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

    console.log("Task Deleted");

    return;
}

//Complete Task

function completeTask(event) {
    let buttonSelect = event.target;
    let taskSelect = buttonSelect.parentElement;
    let idSelect = taskSelect.firstChild.innerText;
    let textSelect = buttonSelect.previousElementSibling;

    buttonSelect.classList.toggle("checked");
    textSelect.classList.toggle("completed");

    //let index = savedTasks.findIndex( (task) => task.ID === idSelect);
    let index = findTask(idSelect);
    
    if (savedTasks[index].isChecked === false) {
        savedTasks[index].isChecked = true;
    }

    else {
        savedTasks[index].isChecked = false;
    }

    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

    console.log("Task Completed");

    return;
}

//Finding Task by ID

function findTask(id) {
    for (let i = 0; i < savedTasks.length; i++) {
        if (savedTasks[i].ID === id) {
            return i;
        }
    }

    return -1;
}