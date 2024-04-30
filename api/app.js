const express = require('express');
const app = express();

const {mongoose} = require("./db/mongoose");    

const bodyParser = require('body-parser')

//Load in the moongoose models
const {List, Task} = require("./db/models")

//Load middleware
app.use(bodyParser.json());


//Corse enabling middleware
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Route Handlers

//List Routes

/**
 * GET /lists
 * Purpose : Get all lists
 */
app.get('/lists', (req, res) => {
    //Return an array of the lists on the db
    List.find({}).then((lists) => {
        res.send(lists);
    })
})

/**
 * POST /lists
 * Purpose : Create a list
 */
app.post('/lists', (req, res) => {
    //Create a new list and return the new list document to the user
    let title = req.body.title;
    let newList = new List({
        title
    })
    newList.save().then((listDoc) => {
        res.send(listDoc);
    })
})
/**
 * PATCH /lists/:id
 * Purpose : Update specified list
 */
app.patch('/lists/:id', (req, res) => {
    //Update specified list with new values specified in req
    List.findOneAndUpdate({_id : req.params.id},{
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

/**
 * DELETE /lists/:id
 * Purpose : Delete specified list
 */
app.delete('/lists/:id', (req, res) => {
    //Delete specified list 
    List.findOneAndDelete({_id : req.params.id}).then((removedListDoc) => {
        res.send(removedListDoc);
    })
})

/**
 * GET /lists/:listId/tasks
 * Purpose : Get tasks in specified list
 */
app.get('/lists/:listId/tasks', (req, res) => {
    //Return all tasks that belong to a specific list
    Task.find({_listId: req.params.listId}).then((tasks) => {
        res.send(tasks);
    })
})

/**
 * POST /lists/:listId/tasks
 * Purpose : Delete specified list
 */
app.post('/lists/:listId/tasks', (req, res) => {
    //Create a new task in the list specified
    let newTask = new Task({
        title: req.body.title,
        _listId : req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose : Update specified task
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    //Update an existing task in specified by taskid
    Task.findOneAndUpdate({
        _id : req.params.taskId,
        _listId : req.params.listId
    }, {$set : req.body}).then(() => {
        res.sendStatus(200);
    })
})

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose : Delete specified task
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    //Delete specified task 
    Task.findOneAndDelete({
        _id : req.params.taskId,
        _listId : req.params.listId
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
})

/**
 * GET /lists/:listId/tasks/:taskId
 * Purpose : Get specific task in specified list
 */
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    //Return speicifed task that belong to a specific list
    Task.findOne({
        _id : req.params.taskId, 
        _listId: req.params.listId}).then((task) => {
        res.send(task);
    })
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})