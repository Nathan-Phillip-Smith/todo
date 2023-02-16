let lists;
let currentList;

function setStorage() {
    if(JSON.parse(localStorage.getItem('lists')) !== null) {
        lists = JSON.parse(localStorage.getItem('lists'));
    } else {
        lists = []
    }
    if(JSON.parse(localStorage.getItem('currentList')) !== null) {
     currentList = JSON.parse(localStorage.getItem('currentList'));
    } else {
        currentList = []
    }
}


setStorage()
render()





// list creation functions end

// render function

   function render() {
    if (lists[0]) {
        document.getElementById('create-todo').style.display = "flex"
        document.getElementById('dropdown').style.display = "initial"
        document.getElementById('list-group').style.display = "initial"
    } else {
        document.getElementById('create-todo').style.display = "none"
        document.getElementById('dropdown').style.display = "none"
        document.getElementById('list-group').style.display = "none"
        document.getElementById('current-list-name').innerHTML = '<p class="getting-started"><i class="bi bi-arrow-left-circle"></i> Create Your First List.</p>'
    }
    // Render lists
    let listsHtml = '<ul class="list-group">';
    lists.forEach((list) => {
      listsHtml += `<li id="${list.id}" class="list-group-item list-box" onclick="changeList(this.id)">${list.name}</li>`;
    });
    listsHtml += '</ul>';
    document.getElementById('lists').innerHTML = listsHtml;
    if (lists[0]){
        document.getElementById('current-list-name').innerText = currentList.name;
    }
    
    // Render Todos
    let todosHtml = '<ul class="list-group">';
    if (lists[0]){
        currentList.todos.forEach((list) => {
            if (list.completed === false) {
                todosHtml += `<li id="${list.id}" class="list-group-item words-and-menu">
            <label class="container">
                <input id="${list.id}" type="checkbox" onclick="markTodoAsCompleted(this.id)">
                <span class="checkmark"></span>
            </label>
            <div id="${list.id}" class="list-text" onclick="markTodoAsCompleted(this.id)">
                ${list.text}
            </div>
            <div class="dropleft">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-list"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a id="${list.id}" class="dropdown-item" onclick="removeTodo(this.id)">Delete Task</a>
                </div>
            </div>
            </div>
            </li>`;
            } else {
                todosHtml += `<li id="${list.id}" class="list-group-item words-and-menu">
            <label class="container">
                <input id="${list.id}" type="checkbox" checked onclick="markTodoAsCompleted(this.id)">
                <span class="checkmark"></span>
            </label>
            <div id="${list.id}" class=list-text onclick="markTodoAsCompleted(this.id)">
                ${list.text}
            </div>
            <div class="dropleft">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-list"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a id="${list.id}" class="dropdown-item" onclick="removeTodo(this.id)">Delete Task</a>
                </div>
            </div>
            </div>
            </li>`;
            }
          });
    }
    
   document.getElementById('current-list-todos').innerHTML = todosHtml;
    // show active list
   lists.forEach((list) => {
    if (currentList.id === list.id) {
        document.getElementById(currentList.id).classList.add("active")
    } else {
        document.getElementById(list.id).classList.remove("active")
    }
   })
   }

// render function end

// add / remove functions

   function addTodo() {
    const text = document.getElementById('todo-input-box').value;
    if(text) {
      let id = randomIdentifier()
      let checkId = randomIdentifier()
      currentList.todos.push({
        id: id,
        checkId: checkId,
        text: text,
        completed: false
      })
      document.getElementById('todo-input-box').value = ''
      render();
      save();
    }
   }

   function addList() {
    const text = document.getElementById('list-input-box').value;
    if(text) {
        let id = randomIdentifier()
        lists.push({
            id: id,
            name: text,
            todos: []
        })
        currentList = lists[lists.length - 1]
        document.getElementById('list-input-box').value = ''
    render();
    save();
   }
}

   function removeList() {
    document.getElementById(currentList.id).remove()
    lists.splice(lists.findIndex((elem) => elem.id === currentList.id), 1)
    currentList = lists[0]
    render();
    save();
   }

   function removeTodo(clickedId) {
    currentList.todos.splice(currentList.todos.findIndex((elem) => elem.id === clickedId), 1)
    console.log(currentList.todos)
    render();
    save();
   }

   function markTodoAsCompleted(clickedId) {
    if(currentList.todos[currentList.todos.findIndex((elem) => elem.id === clickedId)].completed === false) {
        currentList.todos[currentList.todos.findIndex((elem) => elem.id === clickedId)].completed = true
    } else {
        currentList.todos[currentList.todos.findIndex((elem) => elem.id === clickedId)].completed = false
    }
    render();
    save();
   }

   function removeAllTodosCompleted() {
    currentList.todos = currentList.todos.filter((elem) => elem.completed === false);
    render();
    save();
   }

   function changeList(clickedId) {
    if (clickedId !== currentList.id) {
        currentList = lists[lists.findIndex((elem) => elem.id === clickedId)]
        render();
        save();
    }
    
   }

// add / remove functions end

function randomIdentifier() {
    return Math.random().toString(36).slice(2)
}
function save() {
    localStorage.setItem('currentList', JSON.stringify(currentList)); 
    localStorage.setItem('lists', JSON.stringify(lists));
   }
function reset() {
    localStorage.removeItem('currentList', JSON.stringify(currentList)); 
    localStorage.removeItem('lists', JSON.stringify(lists));
    console.log(JSON.parse(localStorage.getItem('lists')))
    setStorage();
    render();
    console.log(JSON.parse(localStorage.getItem('lists')))
   }

      




   