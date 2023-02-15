// list creation functions
const lists = [
   
]
   let currentList = lists[0];



//    list creation functions end

// render function

   function render() {
    // this will hold the html that will be displayed in the sidebar
    let listsHtml = '<ul class="list-group">';
    // iterate through the lists to get their names
    lists.forEach((list) => {
      listsHtml += `<li id="${list.id}" class="list-group-item list-box">${list.name}</li>`;
    });
   
    listsHtml += '</ul>';
    // print out the lists
   
    document.getElementById('lists').innerHTML = listsHtml;
    // print out the name of the current list
   
    document.getElementById('current-list-name').innerText = currentList.name;
    // iterate over the todos in the current list
    let todosHtml = '<ul class="list-group">';
    currentList.todos.forEach((list) => {
      todosHtml += `<li class="list-group-item"><i class="bi bi-check-lg"></i>${list.text}</li>`;
    });
    // print out the todos
    

   document.getElementById('current-list-todos').innerHTML = todosHtml;


    // show active list
   lists.forEach((list) => {
    if (currentList.id === list.id) {
        document.getElementById(currentList.id).classList.add("active")
    } else {
        document.getElementById(currentList.id).classList.remove("active")
    }
   })
    
   }

//    render function end

//    add / remove functions

   function addTodo() {
    const text = document.getElementById('todo-input-box').value;
    if(text) {
      currentList.todos.push({
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

//    add / remove functions end

function randomIdentifier() {
    return Math.random().toString(36).slice(2)
}

      console.log(lists[lists.length-1])




   