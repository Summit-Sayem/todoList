//Set Theme

const themeButton = document.querySelector('.setTheme');

themeButton.addEventListener("click", switchTheme);

function switchTheme() {
    const color = document.querySelector(":root");

    color.classList.toggle("dark");

    console.log("Theme Set");
}


//Query Selectors

const addButton = document.querySelector('.addTask');
const container = document.querySelector('.container');

let inputTask = document.querySelector('.typeTask');

addButton.addEventListener("click", addTask);

//Event Listener Functions

function addTask() {
    let text = inputTask.value;
    
    if (text == "") {
        alert("Please Enter a Task");

        inputTask.focus();
    }

    else if (text == "Summit Sayem") {
        alert("Hello World!");

        inputTask.focus();
    }

    else {
        const newDiv = document.createElement('div');
        const newP = document.createElement('p');
        const completeButton = document.createElement('button');
        const removeButton = document.createElement('button');
    
        newP.append(text);
        completeButton.append("✓");
        removeButton.append("-");
    
        newDiv.appendChild(newP);
        newDiv.appendChild(completeButton);
        newDiv.appendChild(removeButton);
        container.appendChild(newDiv);
    
        newDiv.classList.add('prevTask');
        newP.classList.add('descTask');
        completeButton.classList.add('completeTask');
        removeButton.classList.add('removeTask');
    
        completeButton.addEventListener("click", completeTask);
        removeButton.addEventListener("click", removeTask);

        inputTask.value = "";
        inputTask.focus();

        console.log("Task Added");
    }
}

function completeTask(event) {
    let button = event.target;
    let textSelect = button.previousElementSibling;

    button.classList.toggle("checked");
    textSelect.classList.toggle("completed");

    console.log("Task Completed");
}

function removeTask(event) {
    let button = event.target;
    let taskSelect = button.parentElement;

    taskSelect.classList.add("slideOut");

    taskSelect.addEventListener("transitionend", function(){
        taskSelect.remove();
    });

    console.log("Task Deleted");
}