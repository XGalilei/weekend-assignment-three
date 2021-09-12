$(readyNow);

function readyNow() {
    console.log('jQuery ready');
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
                <td>${task.task-instructions}</td>
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
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: $('#task-input').val()
    }).then(function(response) {
        console.log('Reponse from server:', reponse);
        loadTasks();
    }).catch(handleError);
}

function completeTask() {

}

function removeTask() {

}

function handleError(error) {
    console.log('Error:', error);
}