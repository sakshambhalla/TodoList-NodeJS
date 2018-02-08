const route = require('express').Router();
const database = require('./db.js');

const bodyParser = require('body-parser');

route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());

//
// route.get('/:name',function(req,res){
//
//     console.log(req.params.name);
//    res.send('');
// });

route.post('/add', function(req, res){
    database.addTodo(req.body.task.id,req.body.task.task, req.body.task.done);
    res.send("Value Added to the Database ");
});


route.post('/delete', function(req,res){

   database.delTodo(req.body.id);
   res.send('Value deleted from the database');
});

route.get('/display', function(req,res){
    let todo = database.dispTodo(function(todo){
        res.send(todo)
    });
});

route.post('/update/status', function(req,res){
   database.updateStatus(req.body.id,function(status){
       res.send(status);
   });
});


route.post('/update/item', function(req,res){
    database.updateItem(req.body.id,req.body.itm);
    res.sendStatus(200);
});

module.exports= {
    route
};