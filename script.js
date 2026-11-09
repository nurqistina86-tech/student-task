let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.name;

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Completed";

        completeButton.onclick = function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = function() {
            const newTask = prompt("Edit task:", task.name);

            if (newTask !== null && newTask.trim() !== "") {
                tasks[index].name = newTask.trim();
                saveTasks();
                displayTasks();
            }
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };

        li.append(taskText, completeButton, editButton, deleteButton);
        taskList.appendChild(li);
    });


    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}

function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: task,
        completed: false
    });

    saveTasks();
    displayTasks();

    input.value = "";
}

displayTasks();