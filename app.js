// list creation functions
const lists = []
   let currentList = lists[0];



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
            todosHtml += `<li id="${list.id}" class="list-group-item words-and-menu">
            <label class="container">
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
            <div class=list-text>
                ${list.text}
            </div>
            <div class="dropleft">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-list"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item">Delete Task</a>
                </div>
            </div>
            </div>
            </li>`;
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
   }
}

   function removeList() {
    document.getElementById(currentList.id).remove()
    lists.splice(lists.findIndex((elem) => elem.id === currentList.id), 1)
    currentList = lists[0]
    render();
   }

   function removeTodo() {
    render();
   }

   function markTodoAsCompleted() {
    render();
   }

   function removeAllTodosCompleted() {
    render();
   }
   function changeList(clickedId) {
    if (clickedId !== currentList.id) {
        currentList = lists[lists.findIndex((elem) => elem.id === clickedId)]
        render()
    }
    
   }

// add / remove functions end

function randomIdentifier() {
    return Math.random().toString(36).slice(2)
}

      console.log(lists[lists.length-1])




   