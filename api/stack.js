// Impelement Stack in JavaScript (array of users)
// Support these methods via RestAPI, assume (and check that all elements are strings)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const myStack = [];

app.post('/newElement', (req, res) => {
    const addNewElement = req.body.user
    console.log(addNewElement)
    if (typeof addNewElement == 'string') {
        myStack.push(addNewElement);
        res.json()
        console.log(myStack)
    } else {
        console.log('type error')
        res.json('type error')
    }
});
 
app.delete('/remove', (req, res) => {
    if (myStack.length == 0) return "Stack Is Empty";
    const pop = myStack.pop()
    console.log(pop, ' deleted from stack')
    res.json(pop + ' deleted from stack')
    console.log(myStack)
});

app.get('/top', (req, res) => {
    if (myStack.length == 0) return "Stack Is Empty";
    const peek = myStack[myStack.length - 1]
    console.log(peek, ' is top element of stack')
    res.json(peek + ' is top element of stack');
    console.log(myStack)
});

app.get('/length', (req, res) => {
    if (myStack.length == 0) return "Stack Is Empty";
    const length_stack = myStack.length
    console.log('Length of stack is ', length_stack)
    res.json('Length of stack is ' + length_stack);
    console.log(myStack)
});

app.get('/print', (req, res) => {
    if (myStack.length == 0) return "Stack Is Empty";
    console.log('The elements of the stack: ', myStack)
    res.json('The elements of the stack: ' + myStack)
});

app.get('/search/:id', (req, res) => {
    if (myStack.length == 0) return "Stack Is Empty";
    let id = req.params.id;
    for (var item = 0; item < myStack.length; item++)
        if (item == id) {
            res.json(myStack[item]);
            return(myStack[item]);
        } 
    res.json('not found')
    return('not found')
});

app.listen(5000, () => {
   console.log('server started');
   
});



// Task:
// Push → `addNewElement` Add an element to the stack.  //POST 
// Pop → `deleteElement` Delete an element from the stack.  //DELETE
// Peek → `peek` Get the top element of the stack. //GET
// Length → `length` Return the length of the stack. //GET
// Print → `getAllElements` Return the elements of the stack. //GET
// IsEmpty → `isEmpty` Check if the stack is empty. //GET
// Search → `find:id` Search for the element in the stack. //GET


// Checking

// Create new element throw curl:
// curl -X POST -H "Content-Type: application/json" -d '{"user": "Shlomo"}' http://localhost:5000/newElement
// curl -X POST -H "Content-Type: application/json" -d '{"user": "Haim"}' http://localhost:5000/newElement

// Delete element throw curl:
// curl -X DELETE http://localhost:5000/remove

// Get top throw curl:
// curl -X GET http://localhost:5000/top

// curl -X GET http://localhost:5000/print
// curl -X GET http://localhost:5000/length

// get task by id:
// curl -X GET http://localhost:5000/search/1
