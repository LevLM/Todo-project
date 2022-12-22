const express = require('express');
 
const bodyParser = require('body-parser');
const cors = require('cors');
 
const app = express();
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
const task1 = {
 description: 'This is tasks 1',
 created: `12/12/2022`,
 completed: true,
 id: 1
}
 
const task2 = {
 description: 'This is tasks 1',
 created: `12/12/2022`,
 completed: false,
 id: 2
}
 
const task3 = {
 description: 'This is tasks 1',
 created: `12/12/2022`,
 completed: true,
 id: 3
}
 
//this object contains all tasks
const allTasks = [task1, task2, task3];

app.get('/', (req, res) => {
 res.send('Hello Express app!')
});
 
app.get('/tasks', (req, res) => {
 let completedStatus = req.query.completed
 if (req.query.completed) {
   if (completedStatus == 'true') {
    console.log('get all completed tasks')
    let allCompletedTasks = allTasks.filter(task => task.completed == true);
    console.log(JSON.stringify(allCompletedTasks));
    res.json(allCompletedTasks);
   } else if (completedStatus == 'false') {  
    console.log('get all not completed tasks')
    let allNotCompletedTasks = allTasks.filter(task => task.completed == false);
    console.log(JSON.stringify(allNotCompletedTasks));
    res.json(allNotCompletedTasks);
   } else {
     console.log('completed error, incorrect value')
     res.json('completed error, incorrect value')
   }
 } else {
 console.log('get all tasks requests')
 res.json(allTasks);}
});

app.get('/tasks/:id', (req, res) => {
 let id = req.params.id;
 console.log('get task by id ' + id)
 let findTask = allTasks.find(t => t.id == id);
 res.json(findTask ? findTask : 'not found');
});

let lastId = 3;
function nextId() {
     lastId++;
     return lastId;
}

app.post('/tasks', (req, res) => {
 let descriptionField = req.body.description
 if ((descriptionField == '') || (descriptionField == null)) {
    console.log('description error, incorrect value')
    res.json('description error, incorrect value')
  } else {
   if (lastId == 10000) {
    console.log('error, the number of tasks is more than 10000')
    res.json()
   } else {
    console.log('add a new task ' + JSON.stringify(req.body));
    const newTask = req.body
    newTask.id = nextId()
    allTasks.push(newTask);
    console.log(allTasks)
    res.json();
  }
 }
});

app.delete('/tasks', (req, res) => {
 allTasks.length = 0;
 console.log('delete all tasks, tasks now = ' + allTasks);
 res.json();
});

app.delete('/tasks/:id', (req, res) => {
 let id = req.params.id;
 console.log('delete a task ' + id)
 allTasks.splice(id - 1, 1)
 res.json(allTasks);
});

app.listen(4000, () => {
 console.log('server started');
});


// Create new task throw curl:
// curl -X POST -H "Content-Type: application/json" -d '{"description":"hello my new task", "created":"12/12/2013", "completed":"true", "id":"4"}' http://localhost:4000/tasks
// tests for description:
// curl -X POST -H "Content-Type: application/json" -d '{"created":"12/12/2013", "completed":"true", "id":"4"}' http://localhost:4000/tasks
// curl -X POST -H "Content-Type: application/json" -d '{"description":"", "created":"12/12/2013", "completed":"true", "id":"4"}' http://localhost:4000/tasks
// test for id:
// curl -X POST -H "Content-Type: application/json" -d '{"description":"hello my new task", "created":"12/12/2013", "completed":"true"}' http://localhost:4000/tasks

// get all completed tasks:
// http://localhost:4000/tasks?completed=true%

// get all tasks:
// http://localhost:4000/tasks

// get task by id:
// http://localhost:4000/tasks/:id

// Delete all tasks throw curl:
// curl -X DELETE http://localhost:4000/tasks

// Delete a task by id throw curl:
// curl -X DELETE http://localhost:4000/tasks/1
