let idTodo = parseInt(localStorage.getItem("id")) || 0;

window.onload = function() {

    let inp = document.getElementById('inp');
    let result = document.getElementById('result');
    let btn = document.getElementById('btn');
    display();

    inp.onkeydown = function (event) {
        if (event.keyCode === 13)
            btn.onclick();
    };

    btn.onclick = function () {

        if (inp.value.length >= 1) {
            let task = {
                id: idTodo++,
                task: inp.value,
                done: false
            };

            $.post({
                'url': 'http://localhost:5000/todos/add',
                'data': {task},
                'success': function (res) {
                    localStorage.setItem("id",idTodo.toString());
                    console.log(res);
                    display();
                }
            });
        }

    };
};


    function display() {
        $.ajax({
           'url':'http://localhost:5000/todos/display',
           'type': 'GET',
            'success': function(res){

                let finalList = "";
                for(let i=0; i<res.length; i++) {

                    finalList +=   `<li id="li${i}" class="collection-item" style="background-color:bisque !important;">
                               <input onclick="toggle(this)" id="check${i}" type="checkbox">
                              <label for="check${i}" id="${i}" style="color:#5081ff;font-family:'Open Sans',sans-serif;font-weight:bold">${res[i].task}</label>
                           <i class="small material-icons" id="icon2${i}" onclick="Delete(this);" style="float:right;">delete</i>
                           <i class="small material-icons" id="icon1${i}" onclick="Edit(this);" style="float:right;">edit</i>
                          </li>`;
                }
                result.innerHTML = "";
                result.innerHTML = finalList;
                for(let i=0; i<res.length; i++)
                    strikeOff(res[i].done,i);
                inp.value = "";
               }
        });

    }

function toggle(el){

    let id = el.id.substr(5);

    $.post({
        'url':'http://localhost:5000/todos/update/status',
        'data': {id},
        'success': function(res){
        let checked = res;
        strikeOff(checked, id);
    }
    });

}

function strikeOff(check, id) {
        console.log(check);
    let el = document.getElementById(id);
    if (check) {
        document.getElementById('check' + id).checked = true;                   //Just to ensure(keep tickedones ticked after dipslay is called again and again) as incase of Call from EDIT()
        el.style.textDecoration = 'line-through';
        document.getElementById('li' + id).style.backgroundColor = '#16487b2e';
    }
    else {
        el.style.textDecoration = 'none';
        document.getElementById('li' + id).style.backgroundColor = 'bisque';
    }

}

function Delete(el){
    let id = el.id.substr(5);
    $.post({
        'url':'http://localhost:5000/todos/delete',
        'data':{id},
        'success': function(res){
            console.log(res);
            display();
            idTodo--;
            localStorage.setItem("id",idTodo.toString());
        }
    })
}

function Edit(el) {
    let id = el.id.substr(5);
    let ele = document.getElementById(id);
    ele.innerHTML = `<input type="text" id="editedText" placeholder="Enter the new value" ><button class="btn hoverable" id="Btn">Update</button>`;

    document.getElementById('Btn').onclick = function () {
        let itm = editedText.value;
        $.post({
            'url':'http://localhost:5000/todos/update/item',
            'data': {id,itm},
            'success': function(res){
                display();
            }
        });
    };

    editedText.onkeydown = function (event) {
        if (event.keyCode === 13) {
            let itm = editedText.value;

            $.post({
                'url':'http://localhost:5000/todos/update/item',
                'data': {id,itm},
                'success': function(res){
                    display();
                }
            });
        }
    };
}


