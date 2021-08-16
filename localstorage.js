// variables
var todoForm = document.getElementById('todo-form');
var todoList = document.getElementById('todos');
var doneList = document.getElementById('dones');
var todoInput = document.getElementById('todo-input');
var editInput = document.getElementById('edit-input');
// SITA ATSIKOMENTUOTI PIRMAM UZKROVIMUI
// var duomenys = [
//     {
//         todo: 'Pirmas',
//         done: true,
//     },
//     {
//         todo: 'Antras',
//         done: false,
//     },
//     {
//         todo: 'Trecias',
//         done: false,
//     }
// ];
// duomenys = JSON.stringify(duomenys);
// localStorage.setItem('Sarasas', duomenys);
var duomenys = localStorage.getItem('Sarasas');
duomenys = JSON.parse(duomenys);
// Sudedam duomenis i letenle is data masyvo
duomenys.forEach(item => {
    if (item.done == true) {
        var card = `<div class="border border-1 shadow-sm p-3 mb-3  rounded todo-item">
        <h4 class="mb-3 input-name">${item.todo}</h4>
        <button type="button" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-success move-todo">Move Back</button>
        <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
    </div>`;
    doneList.innerHTML += card;
    } else {
   var card = `<div class="border border-1 shadow-sm p-3 mb-3  rounded todo-item">
        <h4 class="mb-3 input-name">${item.todo}</h4>
        <button type="button" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-success move-todo">Move to Done</button>
        <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
    </div>`;
    todoList.innerHTML += card;
    };
});
// Add todo
todoForm.addEventListener('submit', e => {
    e.preventDefault();
    // 
    if (todoInput.value === '') {
        todoInput.classList.add('is-invalid');
    } else {
        todoInput.classList.remove('is-invalid');
        var newTodo = `<div class="border border-1 shadow-sm p-3 mb-3  rounded todo-item">
        <h4 class="mb-3 input-name">${todoInput.value}</h4>
        <button type="button" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-success move-todo">Move to Done</button>
        <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
    </div>`;
        todoList.innerHTML += newTodo;
        var localItems = JSON.parse(localStorage.getItem('Sarasas'));
        var newTask = {todo: todoInput.value, done: false};
        localItems.push(newTask);
        localStorage.setItem('Sarasas', JSON.stringify(localItems));
        todoForm.reset();
    }
});

// Delete todo item / move todo item
document.querySelector('body').addEventListener('click', e => {
    // Delete todo
    if (e.target.classList.contains('delete')) {
        e.target.closest('.todo-item').remove();
        var localItems = JSON.parse(localStorage.getItem('Sarasas'));
        var text = e.target.closest('.todo-item').querySelector('h4').innerText;
        const nauji = localItems.filter(todo => {
            return todo.todo != text;
            });
        // duomenys = nauji;
        
        localStorage.setItem('Sarasas', JSON.stringify(nauji));
        // move todo to done
    } else if (e.target.classList.contains('move-todo')) {
        doneList.appendChild(e.target.closest('.todo-item'));
        e.target.innerText = 'Move Back';
        e.target.classList.remove('move-todo');
        e.target.classList.add('move-done');
        var localItems = JSON.parse(localStorage.getItem('Sarasas'));
        var text = e.target.closest('.todo-item').querySelector('h4').innerText;
        const nauji = localItems.map(item => {
            return item.todo == text ? {todo: item.todo, done: !item.done} : item;
        });
        localStorage.setItem ('Sarasas', JSON.stringify(nauji));
 // move todo to list
    } else if (e.target.classList.contains('move-done')) {
        // var duomenys = localStorage.getItem('Sarasas');
        todoList.appendChild(e.target.closest('.todo-item'));
        e.target.innerText = 'Move to Done';
        e.target.classList.add('move-todo');
        e.target.classList.remove('move-done');
        var text = e.target.closest('.todo-item').querySelector('h4').innerText;
        var localItems = JSON.parse(localStorage.getItem('Sarasas'));
        const nauji = localItems.map(item => item.todo == text ? {...item, done: !item.done} : item);
        localStorage.setItem('Sarasas', JSON.stringify(nauji));
        // Paspaudziam edit mygtuka
    } else if (e.target.classList.contains('edit')) {
        h4 = e.target.closest('.todo-item').querySelector('h4');
        var h4text = h4.innerText;
        editInput.value = h4text;
    } else if (e.target.classList.contains('edit-submit')) {
        var oldText = h4.innerText;
        h4.innerText = editInput.value;
        var localItems = JSON.parse(localStorage.getItem('Sarasas'));
        const nauji = localItems.map(item => item.todo == oldText ? {...item, todo: editInput.value } : item);
        localStorage.setItem('Sarasas', JSON.stringify(nauji));
    }
});

// confirm edit todo
// document.querySelector('.edit-submit').addEventListener('click', () => {
//     var duomenys = localStorage.getItem('Sarasas');
//     duomenys = JSON.parse(duomenys);
    
// });