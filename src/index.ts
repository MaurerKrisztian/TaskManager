import './style.css';
import {ToDoList} from './todolist';

const container = document.getElementById("todoContainer");

const todoList1 = new ToDoList();
container.appendChild(todoList1.todoListHtmlElemet)

const todoList2 = new ToDoList();
container.appendChild(todoList2.todoListHtmlElemet)

document.getElementById("submitButtonContainer").addEventListener("click", () => {
    todoList2.addItem()
})
