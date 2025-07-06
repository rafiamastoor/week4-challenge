var clickAddTaskButton = document.getElementById("AddTask");

clickAddTaskButton.addEventListener("click", function () {
    var textValue = document.getElementById("task").value;
    let result = textValue.trim();
    if (result != "") {
        var mainContentEl = document.querySelector(".main-content");
        var isDuplicate = false;

        // Check for duplicates by comparing text content
        var existingTasks = mainContentEl.querySelectorAll(".widget");
        existingTasks.forEach(function (taskElement) {
            let cloned = taskElement.cloneNode(true);

            // Remove interactive elements so only pure task text remains
            const elementsToRemove = cloned.querySelectorAll(".button-delete, .button-edit, .markDone");
            elementsToRemove.forEach(el => el.remove());

            let taskText = cloned.textContent.trim();

            if (taskText === result) {
                isDuplicate = true;
            }
        });

        if (isDuplicate) {
            alert("Task already exists!");
        } else {
            var newDivEl = document.createElement("div");
            newDivEl.className = "widget";
            newDivEl.innerHTML = `<input type="checkbox" class="markDone"/>` +
                result +
                `<button class="button-delete">Delete</button>` +
                `<button class="button-edit">Edit</button>`;
            mainContentEl.appendChild(newDivEl);
        }
    } else {
        alert("Please enter task");
    }

    document.getElementById("task").value = "";
});

// JavaScript to handle delete button clicks
document.getElementById('main-content').addEventListener('click', function(event) {
  if (event.target.classList.contains('button-delete')) {
    const widget = event.target.closest('.widget');
    if (widget) {
      widget.remove(); 
    }
  }
});
//Javascript to handle edit button clicks
document.getElementById('main-content').addEventListener('click', function(event) {
  if (event.target.classList.contains('button-edit')) {
    const widget = event.target.closest('.widget');
    let newTask;
  do {
    newTask = prompt('Enter updated task:');
    } while (!/^[a-zA-Z ]*$/.test(newTask));

    if(newTask != null && newTask.trim() != ''){
      widget.innerHTML = `<input type="checkbox" class="markDone"/>` + newTask + `<button class="button-delete">Delete</button>` + `<button class="button-edit">Edit</button>`;
    }
  }  
});
//Javascript to handle mark as done checkbox
document.getElementById('main-content').addEventListener('click', function(event) {
  if (event.target.classList.contains('markDone')) {
    const widget = event.target.closest('.widget');
     const widgetCheckbox = widget.querySelector('.markDone');
    const widgetEditButton = widget.querySelector('.button-edit');
    if (widgetCheckbox) {
      widgetCheckbox.remove();
    }
    if (widgetEditButton) {
      widgetEditButton.remove();
    }
    widget.classList.add('widget-done');
  }
});
