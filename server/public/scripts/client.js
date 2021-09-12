$(readyNow);

function readyNow() {
    console.log('jQuery ready');
    loadTasks();
    $('#submit-task').on('click', addTask);
    $('main').on('click', '.toggle-completion', completeTask);
    $('main').on('click', '.delete-button', removeTask);
}

/**
 * Gathers all tasks from the database
 */
function loadTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(appendTasksToDOM).catch(handleError);
}

/**
 * Appends the tasks onto the DOM
 */
function appendTasksToDOM(tasks) {
    $('#taskList').empty();
    for(let task of tasks) {
        let completeText = task.complete ? '' : `<button class = "toggle-completion" data-id = "${task.id}">Complete</button>`; 
        $('#taskList').append(
            `<tr>
                <td>${task.instructions}</td>
                <td>${task.complete}</td>
                <td>${completeText}</td>
                <td>
                    <button class = "delete-button" data-id = "${task.id}">Delete</button>
                </td>
            </tr>`
        );
    }
}

/**
 * 
 */
function addTask() {
    console.log('addTask working');
    const instr = $('#task-input').val();
    console.log(instr);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {instructions: instr}
    }).then(function(response) {
        console.log('Reponse from server:', response);
        loadTasks();
    }).catch(handleError);
    $('#task-input').val('');
}

/**
 * 
 */
function completeTask() {
    const taskId = $(this).data('id');
    $.ajax({
      method: 'PUT',
      url: `/tasks/${taskId}`
    }).then(function(response) {
      console.log('Task complete');
      loadTasks();
    }).catch(handleError);
}

/**
 * 
 */
function removeTask() {
    const taskId = $(this).data('id');
    $.ajax({
      method: 'DELETE',
      url: `/tasks/${taskId}`
    }).then(function(response) {
      console.log('Task removed');
      loadTasks();
    }).catch(handleError);
}

function handleError(error) {
    console.log('Error:', error);
}