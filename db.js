
const sql = require('mysql');

let config = {
    host: 'localhost',
    user: 'RegularUser',
    password: 'guest',
    database: 'todo',
    multipleStatements: true
    };

let connection = sql.createConnection(config);

function connect(){
    connection.connect();
}

function addTodo(id,task, done) {

    let query = `Insert into todoList values (${id},'${task}', ${done})`;
    connection.query(query, function(err, data){
        if (err) throw err;
        console.log(data);
    })
}

function delTodo(id){
    let query = `Delete from todoList where id = ${id};update todoList set id = id-1 where id > ${id};`;
    connection.query(query, function(err, data){
        if(err) throw err;
    })
}

function dispTodo(ret){
    let query = 'Select * from todoList ';
    connection.query(query,function(err,data){
        if(err) throw err;
        ret(data);
    });
}

function updateStatus(id,ret){
    let status = `select done from todoList where id = ${id}`;
    connection.query(status,function(err,data){
        let statusCh = !data[0].done;
        let query = `update todoList set done = ${statusCh} where id = ${id}`;
        connection.query(query, function(err,data){
            if(err) throw err;
        });
        ret(statusCh);
    });
}

function updateItem(id,item){
        let query = `update todoList set task = '${item}' where id = ${id}`;
        connection.query(query, function(err,data){
            if(err) throw err;
        });
}

module.exports = {
    connect,                            //equivalent to connect:connect
    addTodo,
    delTodo,
    dispTodo,
    updateStatus,
    updateItem
};
