export class ToDoList {
    todoListHtmlElemet: HTMLElement;

    todoList = JSON.parse(localStorage.getItem('todoList')) || [];

    constructor() {
        this.init();
        this.renderItems()
    }

    init() {
        this.todoListHtmlElemet = document.createElement("div");
        this.todoListHtmlElemet.className = "todoListContainer";
    }

    addItem() {

        let todoListItem = {
            title: (<HTMLInputElement>document.getElementById("todoTitle")).value,
            description: (<HTMLInputElement>document.getElementById("toDoDescription")).value
        };

        this.todoList.push(todoListItem)
        this.renderItems();

        (<HTMLInputElement>document.getElementById("todoTitle")).value = '';
        (<HTMLInputElement>document.getElementById("toDoDescription")).value = '';

    }

    deleteItem(index) {
        let reserverdArray = [];
        for (let i = 0; i < this.todoList.length; i++) {
            if (i == index) {

            } else {
                reserverdArray.push(this.todoList[i]);

            }
        }
        this.todoList = reserverdArray;
        this.renderItems();
    }

    renderItems() {
        // let todoListHtml = document.getElementById("todoListContainer");
        this.todoListHtmlElemet.innerHTML = '';

        for (let i = 0; i < this.todoList.length; i++) {


            // this.todoListHtmlElemet.innerHTML += '<div class="singleListItemContainer"> <div class="listItem">' +
            //     this.todoList[i].title + '</div> <div class="description">' +
            //     this.todoList[i].description + '</div>' +
            //     '<div class="deleteItem" onclick="deleteItem(' + i + ')" >X</div> </div>';

            let singleListItemContainer = document.createElement("div");
            singleListItemContainer.className = "singleListItemContainer"


            let listItem = document.createElement("div");
            listItem.className = "listItem"
            listItem.innerText = this.todoList[i].description

            let deleteItemHtml = document.createElement("div");
            deleteItemHtml.className = "deleteItem"
            deleteItemHtml.addEventListener('click', () => {
                this.deleteItem(i)
            })
            deleteItemHtml.innerText = "X"

            singleListItemContainer.appendChild(listItem)
            singleListItemContainer.appendChild(deleteItemHtml)
            this.todoListHtmlElemet.appendChild(singleListItemContainer)
        }
        window.localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

}