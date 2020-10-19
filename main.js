let $todoInput; //where user inputs tasks
let $alertInfo; //info if there's no tasks on the list
let $addBtn; //ADD button - adds new tasks
let $ulList; //list of tasks
let $newTask; //new task to be added in new li element
let $popup;
let $popupInfo; //alert (appears if there's no text inside the input)
let $editedTodo;
let $popupInput; //the text inside the input
let $addPopupBtn; //the CONFIRM button
let $closeTodoBtn; //the button which closes popup
let $idNumber = 0;
let $allTasks;

const main = () => {
    prepareDomElements();
    prepareDomEvents();
}

//selectors returning elements
const prepareDomElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo'); 
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
};

//event listeners:
const prepareDomEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', checkEnter);
};

//adds task to the list
const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();
    } else {
        $alertInfo.innerText = 'Enter a task before clicking the ADD button.';
    }
};

const checkEnter = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
}

//creates tools for every new task
const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    toolsPanel.appendChild(completeBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';
    toolsPanel.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    toolsPanel.appendChild(deleteBtn);
};

//task list's button behaviour
const checkClick = e => {
    if (e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }
};

// shows popup, edits task
const editTask = e => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    
    $popup.style.display = 'flex';
};

const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.removeAttribute('style');
        $popupInfo.innerText =  '';
    } else {
        $popupInfo.innerText = 'Please add content before you click the CONFIRM button';
    }
};

//closes popup
const closePopup = () => {
    $popup.removeAttribute('style');
    $popupInfo.innerText =  '';
};

//deleting task
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTasks.length === 0) {
        $alertInfo.innerText = 'No tasks on the list.';  
    };
};

document.addEventListener('DOMContentLoaded', main);