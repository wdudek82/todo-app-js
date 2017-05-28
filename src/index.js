
class ToDo {

    constructor() {
        this.listOfTasks = [];
        this.todoList = document.getElementById('todo-list');
    }

    addTask() {
        let inputContent = document.getElementById('add-task');
        let newTask = inputContent.value;

        if (newTask) {
            this.listOfTasks.push(newTask);
            inputContent.value = '';
            this.listTasks();
        }
    }

    updateTask() {
        // TODO: change buttons to: "save" and "cancel"
        // TODO: change task item to input box with a text of a task
    }

    deleteTask(taskId) {
        let task = this.listOfTasks[taskId];
        console.log(task, taskId);
    }

    listTasks() {

        this.todoList.innerHTML = '';

        for (let [taskIndex, task] of this.listOfTasks.entries()) {
            let newTaskNode = ToDo.createNode(taskIndex, task);
            // this.todoList.appendChild(newTaskNode);
            this.todoList.insertBefore(newTaskNode, this.todoList.firstChild);
        }

        this.consolePrint();
    }

    static createNode(nodeId, nodeContent) {
        let newNode = document.createElement('li');
        let textNode = document.createTextNode(' ' + nodeContent);
        newNode.id = nodeId;

        // TODO: add some way to mark tasks as completed
        let editButton = ToDo.createButtonNode('edit', `obj.updateTask(${nodeId})`);
        let deleteButton = ToDo.createButtonNode('x', `obj.deleteTask(${nodeId})`);
        newNode.appendChild(editButton);
        newNode.appendChild(deleteButton);


        newNode.appendChild(textNode);

        return newNode;
    }

    static createButtonNode(text, event) {
        let button = document.createElement('button');
        let label = document.createTextNode(text);
        button.appendChild(label);
        button.setAttribute('onClick', event);

        return button;
    }

    consolePrint() {
        console.log(this.listOfTasks);
    }

}


let obj = new ToDo();


// TODO: Future imporovements
// 1. Create Django backend (API) and save todo-list to the database
// 2. generate urls for user to enable logging to his/her lists
