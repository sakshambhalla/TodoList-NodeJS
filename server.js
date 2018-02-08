const express = require('express');
const app = express();
const database = require('./db.js');
const router = require('./route.js');

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/todos', router.route);

let port = 5000;

app.listen(port, function(){

    console.log("Server is running on port on " + port);
    database.connect();
});
