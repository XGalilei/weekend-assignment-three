const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

//Get all tasks from the database
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "task-instructions";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log("Error retrieving tasks:", error);
        res.sendStatus(500);
    });
});

//Post a new task to the database
router.post('/', (req, res) => {
    let newTask = req.body();
    console.log('Adding new task', newTask);
    let queryText = `INSERT INTO "tasks" ("task-instructions") VALUES ($1);`;

    pool.query(queryText, [newTask.task-instructions])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error adding new task', error);
        res.sendStatus(500);
    })
});

//Mark an incomplete task as complete
router.put('/:id', (req, res) => {
    console.log(req.params);
    const taskId = req.params.id;
    const queryText = `UPDATE "tasks" SET "complete" = true WHERE "id" = $1;`;

    pool.query(queryText, [taskId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log("error in /tasks PUT", error);
        res.sendStatus(500);
    });
});

//Delete a task from the database
router.put('/:id', (req, res) => {
    console.log(req.params);
    const taskId = req.params.id;
    const queryText = `DELETE "tasks" SET "complete" = true WHERE "id" = $1;`;

    pool.query(queryText, [taskId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log("error in /tasks DELETE", error);
        res.sendStatus(500);
    });
});


module.exports = router;